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
} from "react-router-dom";
import { getYums, createYum } from "../yums";
import { useEffect, useState } from "react";

// action
export async function action() {
  const yum = await createYum();
  return redirect(`/home/yums/${yum.id}/edit`);
  // return { yum };
}

// const createNewYum = async () => {
//   const yum = await createYum();
//   navigate(`/yums/${yum.id}/edit`); // Navigate to the new Yum's edit page
// };

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

  const handleNewYum = async (event) => {
    event.preventDefault(); // Prevent default form behavior

    const newYum = await createYum(); // Create a new Yum
    setYums([newYum, ...yums]); // Add the new Yum to the list
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
        <h1>YumTogether</h1> {/* Update header */}
          <nav>
            <ul>
              {/* Calorie Tracker Section */}
              <li>
                <NavLink to="#" onClick={toggleCalorieTracker}>
                  Calorie Tracker
                </NavLink>
                {isCalorieTrackerOpen && (
                  <ul>
                    <li>
                      <NavLink to="/home/calorie-tracker">
                        View Tracker
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </nav>

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
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {/* access + render data */}
          {yums.length ? (
              <ul>
              {yums.map((yum) => (
                  <li key={yum.id}>
                      <NavLink
                  to={`yums/${yum.id}`}
                  className={({ isActive, isPending }) =>
                    isActive
                      ? "active"
                      : isPending
                      ? "pending"
                      : ""
                  }
                >
                  {
                      <Link to={`yums/${yum.id}`}>
                          {yum.first || yum.last ? (
                              <>
                                  {yum.first} {yum.last}
                              </>
                          ) : (
                              <i>No Name</i>
                          )}{" "}
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
          {/* <ul>
            <li>
              <Link to={`yums/1`}>Your Name</Link>
            </li>
            <li>
              <Link to={`yums/2`}>Your Friend</Link>
            </li>
          </ul> */}
        </nav>
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