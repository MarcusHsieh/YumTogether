import { 
  Form, 
  useLoaderData,
  useFetcher,
} from "react-router-dom";
import { getYum, updateYum } from "../yums"; // Correct imports
import "./style.css"; // Ensure correct CSS path

export async function loader({ params }) {
  const yum = await getYum(params.yumId);
  
  if (!yum) {
    throw new Response("", {
      status: 404,
      statusText: "Yum not found",
    });
  }
  
  return { yum }; // Load the Yum data
}

export default function Yum() {
  const { yum } = useLoaderData();

  return (
    <div id="yum">
      <h1>Yum Details</h1>

      <div>
        <h2>{yum.yumName || 'No Name'}</h2>

        {yum.picture ? (
          <div>
            <img
              src={`http://localhost:3001/uploads/${yum.picture}`} // Correct path to image
              alt={`Yum Picture`}
              onError={() => console.error('Error loading image')}
            />
          </div>
        ) : (
          <p>No picture available</p>
        )}

        <p>Date: {yum.date || 'Unknown'}</p>
        <p>Restaurant: {yum.restaurantName || 'N/A'}</p>
        <p>Rating: {yum.rating || 0}/10</p>
        <p>Calories: {yum.calorieCount || 0}</p>
        <p>Notes: {yum.notes || 'No notes available'}</p>
      </div>

      <div>
        <Form action="edit">
          <button type="submit">Edit</button>
        </Form>

        <Form
          method="post"
          action="destroy"
          onSubmit={(event) => {
            if (!confirm('Are you sure you want to delete this Yum?')) {
              event.preventDefault(); 
            }
          }}
        >
          <button type="submit">Delete</button>
        </Form>
      </div>
    </div>
  );
}

// Favorite function to mark Yums as favorite
function Favorite({ yum }) {
  const fetcher = useFetcher(); 
  let favorite = yum.favorite;

  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? "★" : "☆"} {/* Toggle between favorite and not */}
      </button>
    </fetcher.Form>
  );
}
