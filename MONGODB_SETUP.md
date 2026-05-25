# MongoDB Setup & Troubleshooting Guide

## Common Issues & Solutions

### ❌ Problem: "Cannot fetch data from MongoDB"

#### 1. **MongoDB Not Running**
**Solution:** Start MongoDB service
```bash
# Windows (if installed via MSI)
# Search for "Services" > find "MongoDB Server" > click "Start"

# Or if using MongoDB Community Edition:
mongod
```

#### 2. **Wrong Connection String**
**Check:** `.env.local` file should have:
```
MONGODB_URI=mongodb://localhost:27017
```

#### 3. **MongoDB Port Issue**
**Check if port 27017 is in use:**
```bash
# Windows PowerShell
netstat -ano | findstr :27017
```

#### 4. **Connection Timeout**
**Solutions:**
- Add timeout to connection string:
  ```
  MONGODB_URI=mongodb://localhost:27017/?serverSelectionTimeoutMS=5000
  ```

#### 5. **Next.js Server Not Restarted**
**Solution:** 
```bash
# Stop server (Ctrl+C)
# Clear cache
rm -r .next

# Restart
npm run dev
```

## Debugging Steps

### Step 1: Check Browser Console
1. Open your browser
2. Press `F12` or right-click → "Inspect"
3. Go to "Console" tab
4. Look for error messages starting with:
   - "Fetching menu from /api/menu..."
   - API Error messages

### Step 2: Check Network Tab
1. In DevTools, go to "Network" tab
2. Refresh the page
3. Look for requests to `/api/menu`
4. Click on it to see:
   - Status Code (should be 200)
   - Response body (should show pizza items)

### Step 3: Check Next.js Server Logs
Look at your terminal where you ran `npm run dev`:
- See GET /api/menu requests
- Look for error messages

### Step 4: Test MongoDB Connection
```bash
# Open MongoDB shell
mongosh

# Check if connection works
show dbs

# Check if pizzalogist database exists
use pizzalogist
db.menu.find().limit(1)
```

## What to Do When Data Still Won't Load

### Option 1: Reset Everything
```bash
# 1. Stop the dev server (Ctrl+C)

# 2. Clear Next.js cache
rm -r .next
rm -r node_modules/.cache

# 3. Restart
npm run dev
```

### Option 2: Reset MongoDB Database
```bash
# 1. Open mongosh
mongosh

# 2. Drop and recreate database
use pizzalogist
db.menu.deleteMany({})

# 3. Exit and refresh the page
exit
```

### Option 3: Check Firewall
- Windows Firewall might be blocking MongoDB port 27017
- Add exception for MongoDB or disable firewall temporarily

## MongoDB Atlas Alternative (Cloud)

If local MongoDB is not working, use MongoDB Atlas:

1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create free cluster
3. Get connection string
4. Update `.env.local`:
   ```
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/pizzalogist
   ```
5. Restart dev server

## Verify It's Working

When working correctly, you should see:
- ✅ Pizzas loading on home page
- ✅ Console shows "Menu data received: {items: [...]}"
- ✅ Network tab shows `/api/menu` with status 200
- ✅ Cart search shows pizza results
