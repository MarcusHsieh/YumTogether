import { 
  Form, 
  useLoaderData,
  useFetcher,
} from "react-router-dom";
import { getYum, updateYum } from "../yums"; // Correct imports
import "./style.css"; // Ensure correct CSS path
import { Rating } from 'react-simple-star-rating';

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
  const starRating = yum.rating || 0;

  return (
    <div id="yum">
      {/* <h1>Yum Details</h1> */}

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

        <div className="detail-line">
          <span className="label">Date:</span>
          <span className="value">{yum.date || 'Unknown'}</span>
        </div>
        
        <div className="detail-line">
          <span className="label">Restaurant:</span>
          <span className="value">{yum.restaurantName || 'N/A'}</span>
        </div>
        
        
        
        <div className="detail-line">
          <span className="label">Calories:</span>
          <span className="value">{yum.calorieCount || 0}</span>
        </div>
        
        <div className="detail-line">
          <span className="label">Notes:</span>
          <span className="value">{yum.notes || 'No notes available'}</span>
        </div>

      <div className="detail-line">
          <span className="label">Rating:</span>
          {[...Array(10)].map((_, index) => (
            <span
              key={index}
              className={`star ${index < starRating ? '' : 'unfilled'}`} // Apply style based on rating
              >
              ★
            </span>
          ))}
          <span className="value">{yum.rating || 0}/10</span>
        </div>
      </div>

      <div className="button-container">
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
