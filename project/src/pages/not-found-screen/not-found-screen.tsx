/*function NotFoundScreen(): JSX.Element {
  const getClassForPromocodeInput = (valid: boolean, invalid: boolean) => {
    if (!valid && !invalid) {
      return "custom-input";
    }

    if (valid && !invalid) {
      return "custom-input is-valid";
    }

    return "custom-input is-invalid";
  };

  return (
    <>
      <div
        style={{
          fontSize: "32px",
          fontWeight: "bold",
          color: "#7575e2",
          textAlign: "center",
          marginTop: "100px",
          marginBottom: "40px",
        }}
      >
        Login
      </div>
      <div className="basket-form">
        <form
          action="#"
          style={{ display: "flex", flexDirection: "column", gap: "20px", width: '400px', margin: 'auto', alignItems: 'stretch' }}
        >
          <div className={getClassForPromocodeInput(false, true)} style={{width: '400px'}}>
            <input type="text" name="promo" placeholder="Enter email" style={{fontSize: '20px', width: '400px'}} />
          </div>
          <div className={getClassForPromocodeInput(false, true)} style={{width: '400px'}}>
            <input type="password" name="promo" placeholder="Enter password" style={{fontSize: '20px', width: '400px'}} />
          </div>
          <div style={{color: '#ed6041'}}>Incorrect email or password!</div>
          <button className="btn" type="submit" style={{marginTop: '0px', color: 'white', backgroundColor: 'rgb(117, 117, 226)'}}>
            Login
          </button>
          <button className="btn" type="submit" style={{marginTop: '0px'}}>
            Don't have an account? Sign up!
          </button>
        </form>
      </div>
    </>
  );
}
export default NotFoundScreen;
*/

function NotFoundScreen(): JSX.Element {
  const getClassForPromocodeInput = (valid: boolean, invalid: boolean) => {
    if (!valid && !invalid) {
      return "custom-input";
    }

    if (valid && !invalid) {
      return "custom-input is-valid";
    }

    return "custom-input is-invalid";
  };

  const fieldLineClass = {
    display: "flex",
    alignItems: "baseline",
    gap: "12px",
    justifyContent: "space-between",
  };

  const fieldClass = {
    padding: "8px 20px",
    backgroundColor: "#fff",
    border: "2px solid #b4b4d7",
    borderRadius: "8px",
  };

  const lineInput = { fontSize: "20px", width: "300px" };

  return (
    <>
      <div
        style={{
          fontSize: "32px",
          fontWeight: "bold",
          color: "#7575e2",
          textAlign: "center",
          marginTop: "100px",
          marginBottom: "40px",
        }}
      >
        New product
      </div>
      <div className="basket-form">
        <form
          action="#"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            width: "800px",
            margin: "auto",
            alignItems: "stretch",
          }}
        >
          <div style={fieldLineClass}>
            <div>
              <span style={{ marginRight: "12px" }}>Vendor code:</span>
              <input
                type="text"
                name="promo"
                placeholder="Vendor code"
                style={lineInput}
              />
            </div>
            <div>
              <span style={{ marginRight: "12px" }}>Price:</span>
              <input
                type="number"
                name="promo"
                placeholder="Price"
                style={lineInput}
              />
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "baseline" }}>
            <span style={{ marginRight: "12px" }}>Name:</span>
            <input
              type="text"
              name="promo"
              placeholder="Name"
              style={{ flexGrow: "2", fontSize: '20px' }}
            />
          </div>
          <div>
            <span style={{ marginRight: "12px" }}>Description:</span>
            <textarea
              name="promo"
              placeholder="Description"
              rows={10}
              cols={76}
              style={fieldClass}
            />
          </div>
          <div style={{ display: "flex", gap: "4px" }}>
            <span style={{ marginRight: "12px" }}>Matrix:</span>
            <input type="radio" id="radioButton" />
            <span style={{ marginRight: "12px" }}>Crop</span>
            <input type="radio" id="radioButton" />
            <span>Full frame</span>
          </div>
          <div style={{ display: "flex", gap: "4px" }}>
            <span style={{ marginRight: "12px" }}>Camera type:</span>
            <input type="radio" id="radioButton" />
            <span style={{ marginRight: "12px" }}>SLR</span>
            <input type="radio" id="radioButton" />
            <span>Mirrorless</span>
          </div>
          <div style={{ display: "flex", gap: "4px" }}>
            <span style={{ marginRight: "12px" }}>Brand:</span>
            <input type="radio" id="radioButton" />
            <span style={{ marginRight: "12px" }}>Canon</span>
            <input type="radio" id="radioButton" />
            <span style={{ marginRight: "12px" }}>Nikon</span>
            <input type="radio" id="radioButton" />
            <span>Sigma</span>
          </div>
          <div style={fieldLineClass}>
            <div>
              <span style={{ marginRight: "12px" }}>ISO:</span>
              <input
                type="number"
                name="promo"
                placeholder="ISO"
                style={lineInput}
              />
            </div>
            <div>
              <span style={{ marginRight: "12px" }}>Exposure:</span>
              <input
                type="number"
                name="promo"
                placeholder="Exposure"
                style={lineInput}
              />
            </div>
          </div>
          <button
            className="btn"
            type="submit"
            style={{
              marginTop: "0px",
              color: "white",
              backgroundColor: "rgb(117, 117, 226)",
            }}
          >
            Create
          </button>
        </form>
      </div>
    </>
  );
}
export default NotFoundScreen;
