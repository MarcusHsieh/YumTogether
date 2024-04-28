import { 
  Form, 
  useLoaderData,
  redirect,
  useNavigate,
} from "react-router-dom";
import { updateYum } from "../yums"; // Correctly import "Yums" functions

// Action to update a "Yum"
export async function action({ request, params }) {
  const formData = await request.formData();

  const updates = {
      date: formData.get("date"), // Date of the Yum
      foodName: formData.get("foodName"), // Name of the food
      restaurantName: formData.get("restaurantName"), // Optional
      rating: parseInt(formData.get("rating"), 10), // Rating out of 10
      calorieCount: parseInt(formData.get("calorieCount"), 10), // Calorie count
      avatar: formData.get("avatar"), // Image URL
      notes: formData.get("notes"), // Notes or additional information
  };

  await updateYum(params.yumId, updates); // Update the Yum with new data
  return redirect(`/yums/${params.yumId}`); // Redirect to the updated Yum's page
}

// Component to edit a "Yum"
export default function EditYum() {
const { yum } = useLoaderData(); // Load the "Yum" data
const navigate = useNavigate(); // For navigation and cancel behavior

return (
  <Form method="post" id="yum-form"> {/* POST method to update data */}
    <p>
      <span>Date</span>
      <input
        type="date"
        name="date"
        defaultValue={yum?.date}
      />
    </p>
    
    <p>
      <span>Food Name</span>
      <input
        placeholder="Food name"
        type="text"
        name="foodName"
        defaultValue={yum?.foodName}
      />
    </p>
    
    <p>
      <span>Restaurant Name</span>
      <input
        placeholder="Restaurant name (optional)"
        type="text"
        name="restaurantName"
        defaultValue={yum?.restaurantName}
      />
    </p>
    
    <p>
      <span>Rating (out of 10)</span>
      <input
        type="number"
        name="rating"
        min="1"
        max="10"
        defaultValue={yum?.rating}
      />
    </p>
    
    <p>
      <span>Calorie Count</span>
      <input
        type="number"
        name="calorieCount"
        min="0"
        defaultValue={yum?.calorieCount}
      />
    </p>
    
    <label>
      <span>Avatar URL</span>
      <input
        placeholder="https://example.com/food.jpg"
        type="text"
        name="avatar"
        defaultValue={yum?.avatar}
      />
    </label>

    <label>
      <span>Notes</span>
      <textarea
        name="notes"
        defaultValue={yum?.notes}
        rows={6}
      />
    </label>
    
    <p>
      <button type="submit">Save</button> {/* Submit button to save changes */}
      
      <button 
        type="button"
        onClick={() => navigate(-1)} 
      >
        Cancel
      </button>
    </p>
  </Form>
);
}
