# 🚀 Batch Scripts Guide

## 📋 Available Scripts

### 1. `quick-start.bat` - Complete Setup
**Use this ONCE when setting up the project for the first time**

**What it does:**
- ✅ Copies environment template to `.env`
- ✅ Installs all dependencies
- ✅ Builds shared packages
- ✅ Sets up database (generates, pushes schema, seeds data)
- ✅ Starts both server and web applications

**When to use:** First time setup only

---

### 2. `start-apps.bat` - Smart Start
**Use this for daily development**

**What it does:**
- ✅ Checks if `.env` file exists
- ✅ Checks if database exists (creates if missing)
- ✅ Starts backend server
- ✅ Starts web application

**When to use:** Daily development work

---

### 3. `start-only.bat` - Quick Start
**Use this when everything is already set up**

**What it does:**
- ✅ Starts backend server
- ✅ Starts web application
- ⚠️ Assumes everything is ready

**When to use:** Quick restarts, when you know everything is set up

---

### 4. `stop-apps.bat` - Stop All
**Use this to stop all running applications**

**What it does:**
- ✅ Kills all Node.js processes
- ✅ Closes Samparka command windows
- ✅ Cleans up running processes

**When to use:** When you're done working, or before restarting

---

## 🎯 Workflow Examples

### First Time Setup:
```bash
quick-start.bat
```

### Daily Development:
```bash
start-apps.bat
```

### Quick Restart:
```bash
stop-apps.bat
start-only.bat
```

### End of Day:
```bash
stop-apps.bat
```

---

## 🔧 What Each Script Checks

| Script | .env File | Dependencies | Database | Apps |
|--------|-----------|--------------|----------|------|
| `quick-start.bat` | ✅ Creates | ✅ Installs | ✅ Sets up | ✅ Starts |
| `start-apps.bat` | ✅ Checks | ❌ Skips | ✅ Checks | ✅ Starts |
| `start-only.bat` | ❌ Skips | ❌ Skips | ❌ Skips | ✅ Starts |
| `stop-apps.bat` | ❌ N/A | ❌ N/A | ❌ N/A | ✅ Stops |

---

## 🚨 Troubleshooting

### "Port already in use" Error:
```bash
stop-apps.bat
start-apps.bat
```

### "Database not found" Error:
```bash
start-apps.bat  # This will create the database
```

### "Environment not found" Error:
```bash
quick-start.bat  # This will create the .env file
```

### Applications not starting:
1. Run `stop-apps.bat`
2. Wait 5 seconds
3. Run `start-apps.bat`

---

## 📝 Notes

- **First time**: Always use `quick-start.bat`
- **Daily use**: Use `start-apps.bat`
- **Quick restarts**: Use `start-only.bat`
- **Clean shutdown**: Use `stop-apps.bat`

The scripts will open separate command windows for the server and web app, so you can see the logs for each application.
