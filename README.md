# Next-to-go App

A Single Page Application that displays **Next to go** races, while supporting responsive design for multiple devices.

Within the races table, a user can see 5 races at all times and all races are sorted by time ascending. The race will not be cleared immediately after the start time is reached, but until one minute after it has started. 

Also, a user is able to toggle race categories (Greyhound/Harness/Horse) by filter, viewing only the selected category.

## How To Boot

In the project directory, you can run:

- run `npm install` to install the packages
- `npm start` to run the app in the development mode and open [http://localhost:3000](http://localhost:3000/) with your browser to see the result.
- `npm test` to run the test suite

## Tech Stack

- React
    - State management: Redux Toolkit
- TypeScript
- UI library: Material UI
- Styling: [CSS-in-JS Solution](https://mui.com/styles/basics/#hook-api) provided by Material UI (similar usage as styled-components)
- Unit test: testing-library/react, jest
- Code quality: eslint, prettier
- Pre-commit/push check: husky, lint-staged

## Folder Structure

```
src
├── index.tsx
├── App.tsx
├── api
│   ├── request
│   │   └── index.ts                # A generic request function with Axios
│   └── races.ts
├── components
│   ├── Main.tsx
│   ├── RacingTable
│   │   ├── RacingTable.tsx
│   │   └── ...related components tsx files
│   └── ErrorAlert
│       └── ErrorAlert.tsx          # Pure component for alerting error
├── redux
│   ├── store.ts          # Redux store config file
│   └── racesSlice.ts     # Race reducer functions
├── constants
│   └── races.ts          
├── types                 # TypeScript types and interfaces
│   └── race.d.ts
├── hooks
│   ├── index.ts          # Reserving index file for creating a public interface
│   ├── redux.ts          # Redux related custom hooks
│   ├── useInterval.ts    # Optimising usage of setInterval with hooks
│   ├── useLatest.ts      # A hook for avoiding the closure problem
│   └── useRace.ts        # Race actions related custom hooks
├── styles
│   ├── global.css
│   └── theme.ts          # Customised theme of Material UI
├── tests
│   ├── RacingTable
│   │   └── ...related components test files
│   ├── ErrorAlert
│   │   └── ...related components test files
│   ├── redux
│   │   └── ...redux test files
│   └── utils
│       └── renderWithRedux.tsx      # Helper for integration test with Redux
└── utils                 # Help functions for features
    └── ...related utils files
```

## Design Decisions

1. Redux Toolkit (State Management)
    
    I use Redux to keep all the states in a single immutable object, which can makes my life easier in managing the whole application state. Also makes the application very predictable and scalable.
    
    Compare with Redux:
    
    1. A lot lesser boilerplate code is required
    2. No need to manually set up `thunk` ****to perform async operations. Instead, `createAsyncThunk` is out of the box for handling async request lifecycles.
    3. Tons of hooks (e.g. `useSelector` can help select from state and `useDispatch` to dispatch action)
        
        Example for selecting races related state from single hook:
        
        ```jsx
        const { races, loading, error, lastFetchAt } = useAppSelector(
            selectNextFiveRacesState
        );
        ```
        
2. Refetch Strategy - every 3 mins
    
    Generally there are two conditions may cause the **data reduction**:
    
    - One minute after the start of the race
    - Users intent to switch the filter. There may not have enough races for the selected category
    
    In order to keep always have sufficient races data to display, races data will be refetched by every 3 mins. Basically how it implement is to store an attribute `lastFetchAt` whenever the fetch request is fulfilled. By comparing the time with the present within the countdown timer, if it has been three minutes since the last fetch, perform a refetch.
    
    ```jsx
    # Pseudocode example
    
    countDownTimer(() => {
      // refetch every 3 mins
      if (now - lastFetchAt > 3 mins) {
        fetchRaces();
      }
    
    	// ...other feature codes
    }, 1000);
    ```
    
    In addition, instead of checking for lack of data and refetch, I decided to get more than at once by increasing the request params `count`. Ensure there’re enough races (5 races) for each selected races.
    
3. UI/UX designs
    
    Highlighted countdown: when the start time is within two minutes; 
    
    Otherwise keep the time in shorter formate.
    
    ![Highlight example](Next-to-go%20App%20c646295c22a844c495313d44ede16253/Untitled.png)
    
    Highlight example
    

## Additional Thinking

Best practise on packages: **Importing & Exporting - use index file**

- Reserving index file for creating a public interface - actually not only for package, but also for day-to-day development, in a common code module, we should treat all the sub files as self-contained package. I consider `index.ts` files like `main` field in a `package.json` file. [https://docs.npmjs.com/cli/v8/configuring-npm/package-json#main](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#main)
- Here’s an example from hooks folder - `index.ts` file:
    
    ```jsx
    export * from "./redux";
    export * from "./useRace";
    export * from "./useInterval";
    export * from "./useLatest";
    ```
    
    and how it may be imported from the outside:
    
    ```jsx
    import { useAppSelector, useInterval, useRace } from "src/hooks";
    ```
    

## **Stretches/Future Work**

1. Further more unit testings
    
    As the time limit, unit tests has done for partial components and redux. In order to improve the test coverage and ensure all code meets quality standard before deployment, more unit tests are required.
    
2. Automation testing (e2e)
    
    For the end users to have a better quality user experience and ensure the robustness of the application, e2e testing is always good to have. (e.g. Cypress, Selenium)
    
3. Pre-render
    
    In order to optimise user experience, several pre-render options to shorten the amount of time to the First Contentful Paint & the First Meaningful Paint.
    
    - SSG - Static Site Generator
    - SSR - Server Site Rendering
    
    If all users see the same content in the first page, it would be better to use SSG instead of SSR as everything is predictable. During the codes deploy to prod, in prod build it already rendered  html file for the first page.
    
    When User navigates to nextToGo.com → send request to our server. Server doesn't need to do the same steps as SSR (fetch data, load & render React app in memory, generated HTML and send it to client), SSG directly sends the html files to the Users Browser with prediction of the page which the user wants to see.
    
4. High traffic/volumes
    
    Assuming the API has a performance issue as the application deploys to prod and experiences a lot of high traffic/volumes. Additional re-try steps may help resolve the unstable API issue. 
    
    For example, the request will retry maximum 5 times after it fails by default. If all failed, then error handling will take over, logging the error and rendering it to the user with instructions on how to recover.
    
5. Deployment 
    
    Can be simply deployed into a CDN e.g. S3+Cloudfront. For future performance enhancement needs can be containerised and orchestrated into a container management service 
    
    e.g. Deploy the app to ecs/k8s with docker containers to automatically handle scalability based on the number of traffics.