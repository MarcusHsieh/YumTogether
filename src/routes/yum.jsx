import { 
  Form, 
  useLoaderData,
  useFetcher,
} from "react-router-dom";
import { getYum, updateYum } from "../yums"; // Import appropriate functions

// Loader function to fetch the "Yum" data
export async function loader({ params }) {
  const yum = await getYum(params.yumId); // Fetch the Yum by ID
  if (!yum) {
    throw new Response("", {
      status: 404,
      statusText: "Yum not found",
    });
  }
  return { yum }; // Return the Yum data
}

// Action function to update the "Yum"
export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = {
    foodName: formData.get("foodName"),
    restaurantName: formData.get("restaurantName"),
    rating: parseInt(formData.get("rating"), 10), // Convert to integer
    calorieCount: parseInt(formData.get("calorieCount"), 10), // Convert to integer
    date: formData.get("date"), // Date of the Yum
  };
  return updateYum(params.yumId, updates); // Update the Yum with the new data
}


export default function Yum() {
  const { yum } = useLoaderData(); // Load the "Yum" data
  
  return (
    <div id="yum">
      <h1>Yum Details</h1> {/* Header */}

      <div>
        <h2>{yum.foodName || "No Name"}</h2> {/* Food name */}
        {yum.pictures && yum.pictures.length > 0 && ( 
          <div> {/* Display user-added pictures */}
            {yum.pictures.map((pic, index) => (
              <img key={index} src={pic} alt={`Yum ${index + 1}`} />
            ))}
          </div>
        )}
        <p>Date: {yum.date}</p> {/* Date */}
        <p>Restaurant: {yum.restaurantName || "N/A"}</p> {/* Restaurant name */}
        <p>Rating: {yum.rating || 0}/10</p> {/* Rating out of 10 */}
        <p>Calories: {yum.calorieCount || 0}</p> {/* Calorie count */}
      </div>

      <div>
        <Form action="edit"> {/* Form to navigate to edit */}
          <button type="submit">Edit</button>
        </Form>
        
        <Form
          method="post"
          action="destroy"
          onSubmit={(event) => {
            if (!confirm("Are you sure you want to delete this Yum?")) {
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

// An example of the `Favorite` function that allows you to mark a "Yum" as favorite
function Favorite({ yum }) {
  const fetcher = useFetcher(); 
  let favorite = yum.favorite;
  
  if (fetcher.formData) {
    favorite = fetcher.formData.get("favorite") === "true"; // Check for optimistic updates
  }

  return (
    <fetcher.Form method="post"> {/* Form to update favorite status */}
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={
          favorite
            ? "Remove from favorites"
            : "Add to favorites"
        }
      >
        {favorite ? "★" : "☆"} {/* Toggle between filled and unfilled star */}
      </button>
    </fetcher.Form>
  );
}
