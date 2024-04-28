import { 
  Form, 
  useLoaderData,
  useFetcher,
} from "react-router-dom";
import { getYum, updateYum } from "../yums"; // Correct imports
import "./style.css"; // Make sure this path is correct

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

// Action function to handle updating Yums
export async function action({ request, params }) {
  const formData = await request.formData();
  
  const updates = {
    yumName: formData.get("yumName"),
    restaurantName: formData.get("restaurantName"),
    calorieCount: parseInt(formData.get("calorieCount"), 10), // Ensure integer
    rating: parseInt(formData.get("rating"), 10), // Ensure integer
    date: formData.get("date"),
    notes: formData.get("notes"),
  };
  
  return updateYum(params.yumId, updates); // Update the Yum
}

// Component to display Yum details
export default function Yum() {
  const { yum } = useLoaderData(); // Load data from the loader
  
  return (
    <div id="yum">
      <h1>Yum Details</h1> {/* Header */}

      <div>
        <h2>{yum.yumName || "No Name"}</h2> {/* Yum name */}
        
        {yum.pictures && yum.pictures.length > 0 ? ( 
          <div> {/* Display user-added pictures */}
            {yum.pictures.map((pic, index) => (
              <img key={index} src={pic} alt={`Yum ${index + 1}`} onError={() => console.error("Image loading error")} />
            ))}
          </div>
        ) : (
          <p>No pictures available</p> // Fallback if no pictures
        )}

        <p>Date: {yum.date || "Unknown"}</p> {/* Date */}
        <p>Restaurant: {yum.restaurantName || "N/A"}</p> {/* Restaurant name */}
        <p>Rating: {yum.rating || 0}/10</p> {/* Rating out of 10 */}
        <p>Calories: {yum.calorieCount || 0}</p> {/* Calorie count */}
        <p>Notes: {yum.notes || "No notes"} </p> {/* Notes */}
      </div>

      <div>
        <Form action="edit"> {/* Edit action */}
          <button type="submit">Edit</button> {/* Button to edit */}
        </Form>
        
        <Form
          method="post"
          action="destroy"
          onSubmit={(event) => {
            if (!confirm("Are you sure you want to delete this Yum?")) {
              event.preventDefault(); // Prevent delete if not confirmed
            }
          }}
        >
          <button type="submit">Delete</button> {/* Button to delete */}
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
