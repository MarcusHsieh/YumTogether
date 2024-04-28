// sidebar that ALWAYS shows up on left side!

// render child routes with <Outlet> (nested UI)
// client side routing with <Link>
import { 
  Outlet, 
  NavLink,
  Link,
  useLoaderData,
  Form,
  redirect,
  useNavigation,
  useSubmit,
  useLocation,
} from "react-router-dom";
import { getYums, createYum } from "../yums";
import { useEffect, useState } from "react";
import "../index.css";

// action
export async function action() {
  const yum = await createYum();
  return redirect(`/home/yums/${yum.id}/edit`);
}


// loader
// filter list with URL search params
export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") || "";
  const yums = await getYums(q);
  return { yums, q };
}

export default function Home() {
  // loads all yums, as well as the search query
  const { yums, q } = useLoaderData();
  const [query, setQuery] = useState(q);
  const navigation = useNavigation();
  const submit = useSubmit();

  const [isCalorieTrackerOpen, setCalorieTrackerOpen] = useState(false); // State to toggle Calorie Tracker

  const toggleCalorieTracker = () => setCalorieTrackerOpen((prev) => !prev);

  // new yum handler
  const handleNewYum = async (event) => {
    // event.preventDefault(); // Prevent default form behavior

    // const newYum = await createYum(); // Create a new Yum
    // setYums((yumVal) => [newYum, ...yumVal]); // Add the new Yum to the list
    // updateSidebar();
  };

  // loading indicator (search spinner)
  const searching =
  navigation.location &&
  new URLSearchParams(navigation.location.search).has(
    "q"
  );

  // click back and update input
  useEffect(() => {
    setQuery(q);
  }, [q]);

  return (
    <>
      <div id="sidebar">

        <h2 className="heading">Yum History</h2>
        <div>
          
          <Form id="search-form" role="search">
            <input
              id="q"
              className={searching ? "loading" : ""}
              aria-label="Search yums"
              placeholder="Search"
              type="search"
              name="q"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                const isFirstSearch = q == null;
                submit(event.currentTarget.form, {
                  replace: !isFirstSearch,
                });
              }}  
            />
            <div
              id="search-spinner"
              aria-hidden
              hidden={!searching}
            />
            <div
              className="sr-only"
              aria-live="polite"
            ></div>
          </Form>
          <Form method="post" onSubmit={handleNewYum}>
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {/* {Navigation list for Yums} */}
          {yums.length ? (
              <ul>
              {yums.map((yum) => (
                <li key={yum.id}>
                  <NavLink
                    to={`yums/${yum.id}`} // Navigation link to the Yum's detail page
                    className={({ isActive, isPending }) =>
                      isActive ? "active" : isPending ? "pending" : ""
                    }
                  >
                    {
                      // Check if there's a first or last name, otherwise show "No Name"
                      <Link to={`yums/${yum.id}`}>
                        {yum.yumName ? (
                          <>
                            {yum.yumName} 
                          </>
                        ) : (
                          <i>No Name</i> // Display when there's no name
                        )} {" "}
                        {yum.favorite && <span>★</span>} 
                      </Link>
                    }
                  </NavLink>
                </li>
              ))}
            </ul>
            
          ) : (
              <p>
                  <i>No yums</i>
              </p>
          )}
        </nav>

        {/* Calorie Tracker Section */}
        <div>
          <nav>
            <ul>
              <li>
                <NavLink to="#" onClick={toggleCalorieTracker}>
                  Calorie Tracker
                </NavLink>
                {isCalorieTrackerOpen && (
                  <ul>
                    <li>
                      <NavLink to="/home/calorie-tracker">
                        Update your DCI
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </nav>
        </div>
        <h1>YumTogether</h1> 
      </div>

      {/* everything here is Outlet, right side */}
      <div 
          id="detail"
          className={
              navigation.state === "loading" ? "loading" : ""
          }
      >
          <Outlet />
      </div>
    </>
  );  
}