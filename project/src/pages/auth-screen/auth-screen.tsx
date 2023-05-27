function AuthScreen(): JSX.Element {
  return (
    <>
      <label>
        <span className="custom-input__label">Email</span>
        <input
          type="text"
          name="email"
          placeholder="Enter your email"
        />
      </label>
      <label>
        <span className="custom-input__label">Password</span>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
        />
      </label>
    </>
  );
}

export default AuthScreen;
