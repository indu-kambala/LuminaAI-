# QUICK
AI
Lumina AI is a full-stack SaaS application that integrates multiple AI services into one platform. It enables users to generate written content, create and edit images, analyze resumes, and participate in a community — all from a centralized dashboard. With a simple pricing model of only $1/month for premium features, Lumina AI is designed to be affordable, scalable, and accessible.

Built with a modern technology stack, it delivers a fast, secure, and seamless user experience. The platform is designed for creators, professionals, and teams who want to enhance productivity through AI-powered tools. Lumina AI simplifies complex tasks into intuitive workflows, making advanced AI accessible to everyone..

<img width="1919" height="933" alt="image" src="https://github.com/user-attachments/assets/95eb86fa-d81b-41c3-8c53-a03c8e6eb6ae" />
<img width="1918" height="917" alt="image" src="https://github.com/user-attachments/assets/70ec3bbb-67c4-4718-a768-0ea57de2ab9a" />
<img width="1903" height="886" alt="image" src="https://github.com/user-attachments/assets/947b2a64-4aef-48ff-8e01-75a927040a22" />
<img width="1917" height="978" alt="image" src="https://github.com/user-attachments/assets/241011d8-47b5-4128-bb59-759db5000303" />
<img width="1886" height="992" alt="image" src="https://github.com/user-attachments/assets/4b535d9f-cdbf-4402-a7f3-3b8e6971dd6d" />
<img width="1874" height="980" alt="image" src="https://github.com/user-attachments/assets/5ca3363e-3df0-4793-8a70-6049e3ce5e0b" />
<img width="1874" height="968" alt="image" src="https://github.com/user-attachments/assets/ff2baf10-b515-4c07-abd0-eb58c5d84822" />
<img width="1882" height="982" alt="image" src="https://github.com/user-attachments/assets/fd70e920-8218-4aa8-9ee5-99131f845ab5" />
<img width="1879" height="966" alt="image" src="https://github.com/user-attachments/assets/b74738df-1fb9-435a-a33d-f976a3b61b35" />
<img width="1884" height="986" alt="image" src="https://github.com/user-attachments/assets/c74e3d3c-38b3-432b-b5af-e131e00d23cf" />
<img width="1895" height="986" alt="image" src="https://github.com/user-attachments/assets/a818caf4-16be-4b56-8ee8-511a15753998" />
<img width="1919" height="952" alt="image" src="https://github.com/user-attachments/assets/3b616f11-d399-4401-972a-5c39b60e87ad" />
<img width="1888" height="994" alt="image" src="https://github.com/user-attachments/assets/9a0e17fd-5f7b-4177-99dd-8bc450e7719f" />
<img width="1887" height="965" alt="image" src="https://github.com/user-attachments/assets/d70635e5-8ec7-4355-a476-0860ba80800a" />
<img width="1885" height="972" alt="image" src="https://github.com/user-attachments/assets/0286538d-3793-4d0f-bacc-38d1bfae3a8c" />

## 🚀 Demo  
Check out the live demo here: [Lumina AI on Vercel](https://your-vercel-demo-link.vercel.app)  

**Features**

🔐 Authentication & Dashboard
Secure authentication and session management with Clerk.

Personalized dashboard for quick access to tools and usage history.

✍️ Content Tools

**AI Article Writing** – Generate professional articles from short prompts.

**Blog Title Generator** – Create SEO-friendly, engaging blog titles.

🖼️ Image Tools

**Image Generation** – AI-generated images from text prompts.

**Background Removal** – Remove image backgrounds for professional editing.

**Object Removal** – Detect and erase unwanted objects from images.

📄 Career Tools

Resume Review – AI-powered resume analysis with structured feedback and suggestions.

🌐 **Community**

A space to share content, interact with other users, and exchange feedback.

💳 **Pricing Plans**
Plan	Features
Free	Article Writing, Blog Title Generator, Community
Pro ($1/month)	Includes Free features plus: Image Generation, Background Removal, Object Removal, Resume Review

## **Tech Stack**

### **Frontend**
- **React.js** – Component-based UI library  
- **Vite** – Fast and optimized build tool  
- **Tailwind CSS** – Utility-first CSS framework  
- **Axios** – API communication  
- **React Hot Toast** – Notifications  
- **React Markdown** – Render Markdown content  
- **Lucide React** – Icon library  
- **Clerk** – Authentication system  

### **Backend**
- **Node.js** – Runtime environment  
- **Express.js** – Backend framework for REST APIs  
- **Neon Database (Postgres)** – Serverless and scalable database  
- **Clerk Webhooks** – Authentication events integration  

### **AI & Deployment**
- **AI APIs** – Integrated with cloud-based AI services  
- **Vercel** – Hosting and deployment platform  


## **Installation & Setup**

### **1. Clone the Repository**
Start by cloning the project from GitHub to your local machine. This will give you access to the source code.  
➡️ [Lumina AI Repository](https://github.com/your-username/lumina-ai)  

git clone https://github.com/indu-kambala/lumina-ai.git
cd lumina-ai
### **2. Install Dependencies**  
Install all required **Node.js dependencies**. This ensures that both the frontend and backend have the necessary packages to run.  

`npm install`
### **3. Set Up the Database (Neon)**  
The project uses **Neon Postgres**, a serverless and scalable database.  

- Create a new database on [Neon](https://neon.tech)  
- Copy your connection string (example: `postgres://username:password@host/dbname`)  
- Add it to your `.env` file as:  
  `DATABASE_URL=your_neon_database_url`  
- Run database migrations or create tables as required. (If you’re using Prisma: `npx prisma migrate dev`)  

---

### **4. Configure Environment Variables**  
Environment variables are required to connect external services such as **Clerk, Neon, and AI APIs**.  

Inside your `.env` file, add the following:  

- `VITE_CLERK_FRONTEND_API = your_clerk_frontend_key`  
- `DATABASE_URL = your_neon_database_url`  
- `CLERK_WEBHOOK_SECRET = your_clerk_webhook_secret`  
- `AI_API_KEY = your_ai_service_api_key`  

📖 Reference → [Clerk Documentation](https://clerk.com/docs)  

---

### **5. Run the Development Server**  
Once dependencies and environment variables are configured, start the app locally.  

Run: `npm run dev`  

Your application will be available at → [http://localhost:5173/](http://localhost:5173/)  

---

### **6. Build for Production**  
To prepare the app for deployment, generate an optimized production build.  

Run: `npm run build`  

---

### **7. Deployment on Vercel**  
Deploy **Lumina AI** easily using **Vercel**:  

- Push your repository to GitHub  
- Connect the repository to [Vercel](https://vercel.com/)  
- Configure all required environment variables in the project settings  
- Deploy with a single click 🚀  

**Future Enhancements**

Usage analytics dashboard for tracking AI service consumption.

Additional AI tools (e.g., grammar checking, paraphrasing).

Team-based collaboration and shared workspaces.

**Contributing**  
We welcome contributions from the community! 🎉  

- If you have ideas for improvements or new features, feel free to **open an issue**.  
- To contribute directly, you can **submit a pull request** with your changes.  
- Please make sure your code follows best practices and is well-documented.  










