body {
  font-family: 'Poppins', sans-serif;
  margin: 0;
  padding: 0;
  background: linear-gradient(135deg, #ff9a9e, #fad0c4);
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.quote-container {
  text-align: center;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: 20px 15px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  max-width: 300px;
  width: 100%;
  height: 250px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  animation: fadeIn 1s ease-in-out;
}
.quote {
  font-size: 1.2rem;
  font-style: italic;
  line-height: 1.4;
  color: #555;
  margin-bottom: 15px;
}
.author {
  font-size: 1rem;
  font-weight: bold;
  color: #333;
}
.quote:before {
  content: '“';
  font-size: 2.5rem;
  color: #ff6f61;
  vertical-align: -0.4em;
}
.quote:after {
  content: '”';
  font-size: 2.5rem;
  color: #ff6f61;
  vertical-align: -0.4em;
}
.button-container {
  margin-top: 10px;
}
button {
  background-color: #ff6f61;
  color: white;
  padding: 8px 16px;
  font-size: 0.9rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;
}
button:hover {
  background-color: #ff4a39;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
