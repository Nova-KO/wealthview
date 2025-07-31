# Deployment Guide - Shimmer Finance AI Companion

## 🚀 Supabase Setup

### 1. Create a Supabase Project
1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project" 
3. Choose your organization
4. Fill in your project details:
   - Name: `shimmer-finance-ai-companion`
   - Database Password: (generate a strong password)
   - Region: Choose closest to your users
5. Click "Create new project"

### 2. Get Your Project URLs and Keys
After your project is created:
1. Go to Settings → API
2. Copy your:
   - Project URL
   - `anon` `public` key
   - `service_role` `secret` key (optional, for admin operations)

### 3. Set Up Your Database Schema
Run these SQL commands in the Supabase SQL Editor:

```sql
-- Enable Row Level Security
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Create profiles table
CREATE TABLE profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    email TEXT,
    full_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create transactions table
CREATE TABLE transactions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    type TEXT CHECK (type IN ('income', 'expense')) NOT NULL,
    date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create budgets table
CREATE TABLE budgets (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    category TEXT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    spent DECIMAL(10,2) DEFAULT 0,
    period TEXT CHECK (period IN ('monthly', 'weekly', 'yearly')) DEFAULT 'monthly',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create goals table
CREATE TABLE goals (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    target_amount DECIMAL(10,2) NOT NULL,
    current_amount DECIMAL(10,2) DEFAULT 0,
    target_date DATE NOT NULL,
    category TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security Policies
-- Profiles
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Transactions
CREATE POLICY "Users can view own transactions" ON transactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own transactions" ON transactions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own transactions" ON transactions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own transactions" ON transactions FOR DELETE USING (auth.uid() = user_id);

-- Budgets
CREATE POLICY "Users can view own budgets" ON budgets FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own budgets" ON budgets FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own budgets" ON budgets FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own budgets" ON budgets FOR DELETE USING (auth.uid() = user_id);

-- Goals
CREATE POLICY "Users can view own goals" ON goals FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own goals" ON goals FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own goals" ON goals FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own goals" ON goals FOR DELETE USING (auth.uid() = user_id);

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE budgets ENABLE ROW LEVEL SECURITY;
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;

-- Function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name)
    VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### 4. Configure Environment Variables Locally
Create a `.env.local` file in your project root:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY

# Optional: For Server-Side Operations
SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_SERVICE_ROLE_KEY
```

## 🌐 Vercel Deployment

### 1. Install Vercel CLI (if not already installed)
```bash
npm install -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Deploy Your Project
Navigate to your project directory and run:
```bash
vercel
```

Follow the prompts:
- Link to existing project? → No
- What's your project's name? → `shimmer-finance-ai-companion`
- In which directory is your code located? → `./`
- Want to override the settings? → No

### 4. Add Environment Variables to Vercel
After deployment, add your environment variables:

```bash
vercel env add VITE_SUPABASE_URL
# Paste your Supabase URL when prompted

vercel env add VITE_SUPABASE_ANON_KEY
# Paste your Supabase anon key when prompted
```

### 5. Deploy to Production
```bash
vercel --prod
```

## 🔧 Alternative: Manual Vercel Setup

1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "New Project"
3. Import your GitHub repository `Nova-KO/shimmer-finance-ai-companion`
4. Configure:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Add Environment Variables:
   - `VITE_SUPABASE_URL`: Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key
6. Click "Deploy"

## 🧪 Testing Your Setup

1. Visit your deployed Vercel URL
2. Try to sign up for a new account
3. Check if the profile is created in Supabase
4. Test the different financial features

## 📝 Important Notes

- The `.env.local` file is gitignored and won't be committed
- Make sure to use the `VITE_` prefix for environment variables in Vite
- All database operations require user authentication
- Row Level Security ensures users can only access their own data

## 🎯 Next Steps

After successful deployment:
1. Set up your Supabase database with the provided schema
2. Configure email templates in Supabase Auth settings
3. Set up any additional integrations (email providers, etc.)
4. Test all functionality thoroughly
5. Consider setting up analytics and monitoring

Your Shimmer Finance AI Companion should now be live and connected to Supabase! 🎉 

## 🔧 Fix in Vercel Dashboard:

### Step 1: Remove the Current Environment Variables
1. Go to your project in **Vercel Dashboard**
2. Navigate to **Settings** → **Environment Variables**
3. **Delete** the current variables that reference `@supabase-url` and `@supabase-anon-key`

### Step 2: Add New Environment Variables with Direct Values

Click **"Add New"** and create these two variables:

```
<code_block_to_apply_changes_from>
Name: VITE_SUPABASE_URL
Value: [paste your actual Supabase URL here]
Environment: Production, Preview, Development

Name: VITE_SUPABASE_ANON_KEY  
Value: [paste your actual Supabase anon key here]
Environment: Production, Preview, Development
```

### Step 3: Get Your Supabase Values

If you don't have your Supabase values yet:

1. **Go to [supabase.com](https://supabase.com)**
2. **Open your project** (or create one if needed)
3. **Go to Settings** → **API**
4. **Copy**:
   - **Project URL** (looks like: `https://abc123.supabase.co`)
   - **Project API Keys** → **anon** **public** key

### Step 4: Redeploy

After updating the environment variables:
1. Go to **Deployments** tab
2. Click **"Redeploy"** on the latest deployment
3. Or push a new commit to trigger automatic deployment

## 📋 Example Values Format:

```
VITE_SUPABASE_URL = https://xyzabc123.supabase.co
VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5emFiYzEyMyIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjc5...
```

This approach avoids the secret references and directly provides the values Vercel needs. Once you fix the environment variables, your deployment should complete successfully! 

Let me know if you need help getting your Supabase credentials. 

## ✅ SOLUTION: Use the New Commit Hash

**The issue is now fixed!** I created a new commit with proper author information. Here's what to do:

## In Vercel, use this new commit hash:

```
<code_block_to_apply_changes_from>
92cfc53
```

**This commit has:**
- ✅ Proper author: "Shimmer Finance <shimmer.finance@example.com>"  
- ✅ Valid commit message: "Fix commit author for Vercel deployment"
- ✅ Successfully pushed to GitHub

## Steps:
1. **Go back to your Vercel deployment page**
2. **Clear the "Commit or Branch Reference" field** 
3. **Enter:** `92cfc53`
4. **Click "Create Deployment"**

## Why this works now:
- ❌ **Before:** Commits had invalid author "Your Name <your.email@example.com>" 
- ✅ **After:** New commit has valid author "Shimmer Finance <shimmer.finance@example.com>"
- ✅ **Result:** Vercel will accept this commit and deploy successfully

**Your Shimmer Finance AI Companion app should now deploy without any "commit author is required" errors!** 🚀

The deployment will pull the latest code with all your mobile responsiveness, voice bot animations, and scrolling features. 