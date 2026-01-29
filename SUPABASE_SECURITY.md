# Supabase Security Hardening Checklist

## Current Status
- Supabase credentials are configured in `.env`
- **No active database usage detected in codebase**
- Anon key is exposed in client bundle (by design with VITE_ prefix)

## CRITICAL: Before Using Supabase

### 1. Row Level Security (RLS) - MANDATORY

Every table MUST have RLS enabled:

```sql
ALTER TABLE your_table ENABLE ROW LEVEL SECURITY;
```

### 2. Anon Key Token Rotation

Current token analysis:
```json
{
  "iss": "bolt",
  "ref": "0ec90b57d6e95fcbda19832f",
  "role": "anon",
  "iat": 1758881574,
  "exp": 1758881574
}
```

**Issue:** `iat` and `exp` are identical → token expired

**Action Required:**
1. Go to Supabase Dashboard → Settings → API
2. Rotate the `anon` public key
3. Update `.env` with new `VITE_SUPABASE_ANON_KEY`
4. Ensure new token has valid expiry (minimum 1 year from now)

### 3. RLS Policy Templates

#### User-owned data pattern:
```sql
-- SELECT: Users can read their own data
CREATE POLICY "Users can read own data"
  ON your_table FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- INSERT: Users can create their own data
CREATE POLICY "Users can insert own data"
  ON your_table FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- UPDATE: Users can update their own data
CREATE POLICY "Users can update own data"
  ON your_table FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- DELETE: Users can delete their own data
CREATE POLICY "Users can delete own data"
  ON your_table FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
```

#### Public read, authenticated write:
```sql
CREATE POLICY "Public can read"
  ON your_table FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated can write"
  ON your_table FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);
```

### 4. Anon Role Permissions Audit

Verify in Supabase SQL Editor:

```sql
-- Check what anon role can access
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd
FROM pg_policies
WHERE roles @> ARRAY['anon'];
```

### 5. Rate Limiting

Configure in Supabase Dashboard:
- Navigate to: Settings → API → Rate Limiting
- Set appropriate limits for anon key:
  - Recommended: 100 req/min per IP
  - Adjust based on traffic patterns

### 6. Security Best Practices

#### DO:
- ✅ Enable RLS on ALL tables
- ✅ Use specific policies (avoid `USING (true)`)
- ✅ Test policies with both authenticated and anon users
- ✅ Rotate anon key if exposed in public repos
- ✅ Use service role key ONLY in backend/Edge Functions

#### DON'T:
- ❌ Never use service role key in frontend
- ❌ Never disable RLS on production tables
- ❌ Never use `USING (true)` for sensitive data
- ❌ Never commit service role key to git

### 7. Testing RLS Policies

Use Supabase SQL Editor with different roles:

```sql
-- Test as anon user
SET ROLE anon;
SELECT * FROM your_table;

-- Test as authenticated user
SET ROLE authenticated;
SET request.jwt.claim.sub = 'user-uuid-here';
SELECT * FROM your_table;

-- Reset
RESET ROLE;
```

### 8. Monitoring

Enable logging in Supabase Dashboard:
- Settings → Logs → Database Logs
- Monitor for:
  - Failed queries due to RLS
  - Unusual access patterns
  - Rate limit violations

## When Adding Supabase to App

1. Create `src/lib/supabaseClient.ts`:
```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
```

2. Test RLS before going live
3. Enable monitoring
4. Document all policies

## Emergency: Suspected Breach

1. Immediately rotate anon key in Dashboard
2. Review access logs in Supabase
3. Check for unauthorized data access
4. Update `.env` and redeploy
5. Audit all RLS policies

---

**Last Updated:** 2026-01-29
**Status:** Credentials configured, no active usage yet
