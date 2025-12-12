import "../styles/error.css";

export default function Error({ error }) {
  
    return (
        <div 
          class='error-message'
        >
          {error}
        </div>
    );
}