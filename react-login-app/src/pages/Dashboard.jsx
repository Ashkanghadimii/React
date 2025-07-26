function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="dashboard">
      <div className="box">
        <h2>خوش آمدید!</h2>
        <p>شما با موفقیت وارد شدید.</p>
        {user && (
          <div>
            <p>نام: {user.name}</p>
            <p>کد ملی: {user.nationalCode}</p>
            <p>شماره تلفن: {user.phoneNumber}</p>
            <p>شماره قبض: {user.billNumber}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
