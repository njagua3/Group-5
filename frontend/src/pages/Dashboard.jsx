export default function Dashboard({ user }) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl">Welcome, {user.username}!</h1>
        <p>Your role is: {user.role}</p>
      </div>
    );
  }
  