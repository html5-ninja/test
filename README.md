# Live demo
https://html5-ninja.github.io/test/

## About the project
I started the project with my boilerplate code [react-web-app](https://github.com/html5-ninja/react-web-app)
- including Vite, TypeScript, ESLint, Prettier, Storybook and TailwindCSS.
- added jest, react-i18next, toast lib and zustand for state management.
- deployement is done with github pages.

### File structure
- `src/`: Source code for the application.
   - `component/`: Reusable UI components.
   - `pages/`: Application pages.
   - `store/`: Zustand store for state management.
   - `i18n/`: i18n.
   - `api/`: API call functions and mappers.
   - `mocks/`: Mock data for development and testing.
   - `mappers/`: prepare the data for the components.

### simulate api calls
   - json mock data placed under `public/api/data.json` folder.
    
### env
   - VITE_API_URL=/api 
   - VITE_PAGINATION_PAGE_SIZE=8

### run locally
- clone repo `git clone https://github.com/html5-ninja/test.git`
- run `npm install`
- run `npm run dev` to start the development server
- run `npm run storybook` to start the storybook server
- run `npm run test` to run the tests 
