export default async function SignIn() {
  return (
    <div className="flex flex-col items-center h-full text-center px-4">
      <div className="h-1/4"></div>
      <h1 className="text-2xl md:text-4xl font-bold mb-4">
        Please check your email
      </h1>
      <h3>We have sent a sign-in link to your email address.</h3>
    </div>
  );
}
