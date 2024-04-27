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
import { getContacts, createContact } from "../contacts";
import { useEffect, useState } from "react";

// action
export async function action() {
    const contact = await createContact();
    return redirect(`/contacts/${contact.id}/edit`);
    // return { contact };
}

// loader
// filter list with URL search params
export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") || "";
  const contacts = await getContacts(q);
  return { contacts, q };
}

export default function Root() {
    // loads all contacts, as well as the search query
    const { contacts, q } = useLoaderData();
    const [query, setQuery] = useState(q);
    const navigation = useNavigation();
    const submit = useSubmit();

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
          <h1>React Router Contacts</h1>
          <div>
            <Form id="search-form" role="search">
              <input
                id="q"
                className={searching ? "loading" : ""}
                aria-label="Search contacts"
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
            {contacts.length ? (
                <ul>
                {contacts.map((contact) => (
                    <li key={contact.id}>
                        <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive
                        ? "active"
                        : isPending
                        ? "pending"
                        : ""
                    }
                  >
                    {
                        <Link to={`contacts/${contact.id}`}>
                            {contact.first || contact.last ? (
                                <>
                                    {contact.first} {contact.last}
                                </>
                            ) : (
                                <i>No Name</i>
                            )}{" "}
                            {contact.favorite && <span>★</span>}
                        </Link>
                    }
                  </NavLink>
                        
                    </li>
                ))}
                </ul>
            ) : (
                <p>
                    <i>No contacts</i>
                </p>
            )}
            {/* <ul>
              <li>
                <Link to={`contacts/1`}>Your Name</Link>
              </li>
              <li>
                <Link to={`contacts/2`}>Your Friend</Link>
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