# Samparka - AI-Powered Contact Forms

Transform your contact forms with conversational AI that collects the right information, validates data, and provides a delightful user experience.

## 🚀 Features

- **Conversational Interface**: Natural dialogue that feels like talking to a helpful assistant
- **Smart Data Collection**: AI asks only what's needed with intelligent follow-ups
- **Real-time Validation**: Instant feedback and error correction
- **Auto-routing**: Intelligent tagging and priority assignment
- **Multiple Use Cases**: Sales, Appointments, and Support forms
- **Embeddable Widget**: Easy integration into any website
- **Admin Dashboard**: View, manage, and export leads
- **Slack Notifications**: Real-time alerts for new submissions

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager
- **Git** for version control

## 🛠️ Installation

### Quick Setup (Windows)

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd samparka
   ```

2. **Run the setup script**
   ```bash
   setup.bat
   ```
   This will install dependencies, build packages, set up the database, and seed it with sample data.

3. **Configure environment variables**
   Edit `.env` and add your configuration:
   ```env
   # LLM Configuration (Required)
   OPENAI_API_KEY=your_openai_api_key_here
   
   # Database
   DATABASE_URL="file:./dev.db"
   
   # Slack Notifications (Optional)
   SLACK_WEBHOOK_URL=your_slack_webhook_url_here
   
   # App Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   NEXT_PUBLIC_API_URL=http://localhost:3001
   NODE_ENV=development
   ```

### Manual Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Build shared packages**
   ```bash
   cd packages/playbooks && npm run build
   cd ../shared && npm run build
   cd ../..
   ```

3. **Set up the database**
   ```bash
   cd apps/server
   copy ../../.env .
   npm run db:generate
   npm run db:push
   npm run db:seed
   ```

4. **Build the widget**
   ```bash
   cd ../widget
   npm run build
   ```

## 🚀 Running the Application

### Development Mode

#### Quick Start (Windows)
```bash
start.bat
```
This will open two terminal windows - one for the server and one for the web app.

#### Manual Start

1. **Start the backend server**
   ```bash
   cd apps/server
   npm run dev
   ```
   The server will run on http://localhost:3001

2. **Start the web application** (in a new terminal)
   ```bash
   cd apps/web
   npm run dev
   ```
   The web app will run on http://localhost:3000

3. **Test the API** (optional)
   Open `test-api.html` in your browser to test the API endpoints

### Production Mode

1. **Build all applications**
   ```bash
   npm run build
   ```

2. **Start the server**
   ```bash
   cd apps/server
   npm start
   ```

3. **Start the web app**
   ```bash
   cd apps/web
   npm start
   ```

## 📱 Usage

### Demo Website

Visit http://localhost:3000 to see the demo website with three different form types:

1. **Sales Inquiry** - B2B SaaS lead collection
2. **Service Appointment** - Clinic/Studio booking
3. **Support Ticket** - Product issue reporting

### Admin Inbox

Visit http://localhost:3000/inbox to:
- View all submitted leads
- Filter by use case, status, or search terms
- Update lead status
- Export data as CSV

### Embedding the Widget

To embed the widget in your website:

1. **Include the widget script**
   ```html
   <script src="http://localhost:3001/widget/samparka-widget.js"></script>
   ```

2. **Initialize the widget**
   ```javascript
   const widget = new SamparkaWidget({
     apiUrl: 'http://localhost:3001',
     useCase: 'SALES', // or 'APPT', 'SUPPORT'
     source: 'your-website.com',
     theme: {
       primaryColor: '#3b82f6',
       position: 'bottom-right'
     }
   });
   ```

## 🏗️ Project Structure

```
samparka/
├── apps/
│   ├── web/                 # Next.js demo website
│   ├── server/              # Express.js API server
│   └── widget/              # Embeddable widget
├── packages/
│   ├── playbooks/           # Form schemas and prompts
│   └── shared/              # Shared utilities
├── prisma/                  # Database schema
└── README.md
```

## 🔧 Configuration

### OpenAI API Key

1. Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Add it to your `.env` file as `OPENAI_API_KEY`

### Slack Notifications

1. Create a Slack app in your workspace
2. Add an Incoming Webhook
3. Copy the webhook URL to `SLACK_WEBHOOK_URL` in your `.env` file

### Database

The application uses SQLite by default for development. For production, you can switch to PostgreSQL by:

1. Installing PostgreSQL
2. Updating `DATABASE_URL` in your `.env` file
3. Running `npm run db:push` to create tables

## 🧪 Testing the Forms

### Sales Inquiry Form
- Try: "Hi, I'm interested in your product"
- The AI will collect: name, email, company, team size, problem statement, budget, urgency

### Service Appointment Form
- Try: "I need to book an appointment"
- The AI will collect: name, email, service type, preferred date/time, location

### Support Ticket Form
- Try: "I'm having trouble with the app"
- The AI will collect: email, product area, severity, description, environment details

## 📊 Monitoring

### Health Check
Visit http://localhost:3001/health to check server status

### Database Management
```bash
# View database in browser
npm run db:studio

# Reset database
rm apps/server/dev.db
npm run db:push
npm run db:seed
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Deploy the web app**
   ```bash
   cd apps/web
   vercel
   ```

2. **Deploy the server**
   ```bash
   cd apps/server
   vercel
   ```

3. **Update environment variables** in Vercel dashboard

### Docker

```bash
# Build and run with Docker Compose
docker-compose up --build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Troubleshooting

### Common Issues

1. **Database connection errors**
   - Ensure SQLite file permissions are correct
   - Run `npm run db:push` to recreate tables

2. **OpenAI API errors**
   - Verify your API key is correct
   - Check your OpenAI account has sufficient credits

3. **Widget not loading**
   - Ensure the server is running on the correct port
   - Check browser console for CORS errors

4. **Slack notifications not working**
   - Verify webhook URL is correct
   - Check Slack app permissions

### Getting Help

- Check the [Issues](https://github.com/your-repo/issues) page
- Create a new issue with detailed error information
- Include logs and environment details

## 🎯 Roadmap

- [ ] Email notifications
- [ ] Advanced analytics
- [ ] Custom form builder
- [ ] Multi-language support
- [ ] Mobile app
- [ ] Enterprise features

---

Built with ❤️ using Next.js, Express.js, Prisma, and OpenAI
