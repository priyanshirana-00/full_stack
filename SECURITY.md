# Security Policy

## Supported Versions

Currently supported versions of this project:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability, please follow these steps:

### 1. **Do Not** Open a Public Issue
Security vulnerabilities should not be publicly disclosed until they have been addressed.

### 2. Report Privately
Send an email to: **priyanshirana24@navgurukul.org**

Include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

### 3. Response Timeline
- **Initial Response:** Within 48 hours
- **Status Update:** Within 7 days
- **Fix Timeline:** Depends on severity

### 4. What to Expect
- We'll acknowledge your report
- We'll investigate the issue
- We'll develop and test a fix
- We'll release a security update
- We'll credit you (if desired) in the release notes

## Security Measures in Place

### Authentication
- ✅ Password hashing with bcrypt (10 rounds)
- ✅ JWT tokens for session management
- ✅ Token expiration (7 days)
- ✅ Secure token storage (localStorage)
- ✅ Protected API routes with middleware

### Data Protection
- ✅ MongoDB connection over TLS
- ✅ Environment variables for secrets
- ✅ .gitignore for sensitive files
- ✅ Input validation on all forms
- ✅ Email normalization (lowercase)

### API Security
- ✅ CORS configuration
- ✅ Error message sanitization
- ✅ HTTP status codes for different errors
- ✅ Request body parsing limits
- ✅ Authorization headers validation

### Deployment
- ✅ HTTPS enforced (Render default)
- ✅ Environment variable encryption
- ✅ MongoDB Atlas network security
- ✅ No hardcoded credentials

## Best Practices for Users

### If You're Deploying This App:

1. **Use Strong Secrets**
   ```bash
   # Generate a strong JWT secret
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

2. **Secure Your MongoDB**
   - Use MongoDB Atlas with IP whitelisting
   - Use strong passwords
   - Enable two-factor authentication

3. **Protect Your API Keys**
   - Never commit .env files
   - Rotate API keys regularly
   - Use Render's secret management

4. **Monitor Your Application**
   - Check logs regularly
   - Monitor for unusual activity
   - Set up alerts for errors

5. **Keep Dependencies Updated**
   ```bash
   npm audit
   npm audit fix
   ```

## Known Security Considerations

### Token Storage
Tokens are stored in `localStorage` which is vulnerable to XSS attacks. For production:
- Consider using httpOnly cookies
- Implement Content Security Policy (CSP)
- Sanitize all user inputs

### Rate Limiting
Current version does not implement rate limiting. Consider adding:
- Express rate limiter for API endpoints
- Login attempt limits
- Chat message rate limits

### Session Management
- Tokens expire after 7 days
- No refresh token mechanism yet
- Consider implementing automatic token refresh

## Security Updates

We will announce security updates via:
- GitHub Releases
- README updates
- Email notifications (if registered)

## Credits

We appreciate responsible disclosure from security researchers.

---

**Last Updated:** October 30, 2025
