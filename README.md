# Book Buddy

Create a simple and functional React MVP web application called Library Book Lending App.
The application must follow exactly the requirements below. Do not add unnecessary features or functionality outside of these requirements.
1. Purpose
The application is a simple library system where users can register and log in, add borrowed books, view all users, and click on a user to see the books that the user has borrowed.
The application must use:
React
Supabase
Supabase Authentication
Supabase Database
The application must be connected to Supabase and all submitted data must be stored in the Supabase database.
2. Authentication
Implement basic user authentication using Supabase.
The application must have:
Registration
Create a registration page with:
Name
Email
Password
Users must be able to create an account.
Login
Create a login page with:
Email
Password
Users must be able to log in.
Logout
After logging in, users must have a Logout button.
When the user logs out, they should be redirected to the Login page.
3. Pages
The application must contain at least these three main pages:
Home Page
Create a simple home page containing:
Application name: Library Book Lending App
Short description
Navigation
Link to Login
Link to Register
Add Borrowed Book Page
Create a form for entering a borrowed book.
The form must contain:
User
Book title
Author
Borrow date
Return date
The submitted information must be saved in Supabase.
Users Page
Display a list of all registered users.
Each user should be displayed clearly.
When the user clicks on a user's name, open a details page or details section showing the books borrowed by that user.
4. User Details
When clicking on a user, display:
User name
User email
List of books borrowed by that user
For every borrowed book display:
Book title
Author
Borrow date
Return date
The books must be loaded from the Supabase database.
5. Supabase Database
Create the necessary database tables.
Profiles table
Create a profiles table containing:
id
name
email
The profile must be connected to the authenticated Supabase user.
Borrowed Books table
Create a borrowed_books table containing:
id
user_id
book_title
author
borrow_date
return_date
The user_id must identify which user borrowed the book.
Create the necessary relationship between the user/profile and borrowed books.
6. Database Functionality
The application must be able to:
Register a user.
Log in a user.
Log out a user.
Add a borrowed book through the form.
Save the borrowed book in Supabase.
Retrieve users from Supabase.
Display all users.
Click on a user.
Display the books borrowed by that user.
Do not use hardcoded example data. Data displayed in the application must come from Supabase.
7. Navigation
Create simple navigation between the pages.
Navigation should contain:
Home
Add Borrowed Book
Users
Login/Register depending on authentication state
Logout when the user is logged in
Use React Router for navigation.
8. User Interface
Create a simple, clean and professional interface.
Requirements:
Responsive design
Clear navigation
Simple forms
Clear buttons
Clean cards or tables for displaying users and books
Good spacing and readable typography
Do not make the design unnecessarily complicated.
9. Form Validation
The borrowed book form must validate that:
User is selected
Book title is entered
Author is entered
Borrow date is entered
Return date is entered
Show a clear error message if required information is missing.
After successfully submitting the form, show a success message and clear the form.
10. Authentication Protection
Users who are not logged in should be able to access:
Home
Login
Register
Pages for adding borrowed books and viewing users should require authentication.
If an unauthenticated user tries to access a protected page, redirect them to the Login page.
11. Final Requirements
Before finishing the application, make sure that:
Registration works.
Login works.
Logout works.
Navigation works.
The borrowed book form works.
Data is saved to Supabase.
Users are displayed from Supabase.
Clicking a user displays their borrowed books.
The application has at least three pages.
The application is responsive.
There are no errors in the browser console.
This is an MVP for an educational assignment.
Follow only the requirements above and do not add unnecessary features.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://lend-a-shelf.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/4f82128b-6526-4f1a-a5d6-b4709f9cb8c9).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
