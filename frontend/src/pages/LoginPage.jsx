import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/3699921/pexels-photo-3699921.jpeg?auto=compress&cs=tinysrgb&w=1600')",
      }}
    >
      <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-3xl font-bold mb-6 text-blue-900 font-sans">
          Vayu Sagar Gyan
        </h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
