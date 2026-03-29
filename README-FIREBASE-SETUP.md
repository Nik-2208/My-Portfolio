# Firebase Setup for Portfolio

## 1. Fix .env.local
Replace entire content with **exact format** (no JS object, flat vars, **NO QUOTES around values**):

```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDQ0ZTJi_JPz48okjFxygln6uxPMgJOAe0
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=nik-portfolio-c1dc0.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=nik-portfolio-c1dc0
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=nik-portfolio-c1dc0.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=740864506793
NEXT_PUBLIC_FIREBASE_APP_ID=1:740864506793:web:6986109eb2f112fedde2b8
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-3KJ8KR3YEF
```

## 2. Restart
```
# Kill server
Ctrl+C

# Clean
rmdir /s /q .next

# Restart
npm run dev
```

## 3. Verify
- Browser console: `[Firebase DEBUG]` → keys loaded, `[Firebase] Initialized successfully`
- Submit form → `[Firebase] Message saved successfully: abc123`
- Firebase Console > Firestore > `contacters` collection

Done! 🚀
