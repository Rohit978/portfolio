# Portfolio Project Structure

This document outlines the organization of the portfolio website, including the newly added AURA project.

## Directory Structure

```
portfolio-main/
├── index.html              # Main portfolio page
├── blog.html               # Blog listing page
├── style.css               # Main stylesheet
├── main.js                 # Main JavaScript file
│
├── Project Blog Pages/
│   ├── custom-cursor-guide.html
│   ├── django_blog.html
│   └── aura-blog.html      # AURA project blog page
│
├── Images/
│   ├── intern.png          # PM Internship Portal image
│   ├── 1.png               # Project image
│   ├── 2.png               # PrepGen project image
│   └── aura.svg            # AURA project placeholder image
│
└── PROJECT_STRUCTURE.md    # This file
```

## Projects Overview

### 1. PM Internship Portal
- **Location**: Project card in `index.html`
- **Blog**: N/A
- **Image**: `intern.png`
- **Description**: AI-driven portal for finding internships

### 2. PrepGen
- **Location**: Project card in `index.html`
- **Blog**: N/A
- **Image**: `2.png`
- **Description**: AI-powered study and exam preparation tool

### 3. AURA ⭐ (New)
- **Location**: Project card in `index.html` (line ~103)
- **Blog Entry**: `blog.html` (line ~52)
- **Blog Page**: `aura-blog.html`
- **Image**: `aura.svg`
- **Description**: Intelligent music recommendation system with ML and YouTube scraping

## Adding New Projects

To add a new project to the portfolio:

1. **Add Project Card** in `index.html`:
   - Add a new `project-card-enhanced` div in the `#projects` section
   - Include project image, title, description, and link

2. **Add Blog Entry** (optional) in `blog.html`:
   - Add a new `blog-post-card` div
   - Include title, meta information, description, and link to detailed blog page

3. **Create Blog Page** (optional):
   - Create a new HTML file following the structure of `aura-blog.html`
   - Include detailed project information, technical details, and lessons learned

4. **Add Project Image**:
   - Add image file to the root directory
   - Update image reference in project card

## Code Organization Guidelines

- **HTML**: Semantic HTML5 structure with clear sectioning
- **CSS**: Organized in `style.css` with consistent naming conventions
- **JavaScript**: Interactive features in `main.js`
- **Images**: SVG preferred for logos/graphics, PNG/JPG for screenshots
- **Blog Posts**: Consistent structure with proper navigation

## AURA Project Details

### File Locations
- **Main Project Card**: `index.html` (projects section)
- **Blog Listing**: `blog.html` (blog posts section)
- **Detailed Blog**: `aura-blog.html`
- **Project Image**: `aura.svg`

### Key Features Documented
- YouTube scraping integration
- Machine learning recommendation engine
- Technical architecture
- Challenges and solutions
- Future enhancements

### Technologies Mentioned
- Frontend: HTML5, CSS3, JavaScript
- Backend: Python (Flask/Django)
- ML: scikit-learn, TensorFlow/PyTorch
- Web Scraping: yt-dlp, BeautifulSoup
- Database: PostgreSQL/MongoDB

