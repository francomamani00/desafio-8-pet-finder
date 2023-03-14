const API_BASE_URL = "https://desafio-modulo-7-pet-finder.onrender.com";
// const API_BASE_URL = "http://localhost:3005";

export async function userLogin(email, password) {
  const token = await fetch(API_BASE_URL + "/auth/token", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" },
  });
  const tokenJson = await token.json();
  return tokenJson;
}
export async function getUsuario(userId, token, cb?) {
  const idUsuario = userId;
  const tokenBearer = "bearer " + token;
  fetch(API_BASE_URL + "/usuario/" + idUsuario, {
    method: "GET",
    headers: {
      Authorization: tokenBearer,
      "Content-type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      // (cs.email = data.email), (cs.name = data.name), (cs.userId = data.id);
      // this.setState(cs);
      // console.log(cs);

      cb(data);
    });
}

export async function actualizarName(token, datos: any, cb?) {
  // const cs = state.getState();
  const tokenBearer = "bearer " + token;
  fetch(API_BASE_URL + "/edit-name", {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      Authorization: tokenBearer,
    },
    body: JSON.stringify(datos),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      cb(data);
    });
}
export async function actualizarPassword(token, datos: any, cb?) {
  console.log("dentro del back", token, datos);
  const tokenBearer = "bearer " + token;
  fetch(API_BASE_URL + "/edit-password", {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      Authorization: tokenBearer,
    },
    body: JSON.stringify(datos),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      cb(data);
    });
}

export async function usuarioNuevo(
  name: string,
  email: string,
  password: string,
  cb?
) {
  fetch(API_BASE_URL + "/auth", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((datos) => {
      cb(datos);
    });
}

export async function getReportesCerca(mylat, mylng, cb?) {
  fetch(API_BASE_URL + `/reportes-cerca-de?myLat=${mylat}&myLng=${mylng}`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((e) => {
      if (e) {
        // cs.cercaMio = e;
        // this.setState(cs);
        cb(e);
      }
    })
    .catch((error) => {
      console.error("falta tu ubicacion");
    });
}
export async function getReportesDeUnUser(token, cb) {
  const tokenBearer = "bearer " + token;
  fetch(API_BASE_URL + "/me/mis-reportes", {
    method: "get",
    headers: {
      "Content-type": "application/json",
      Authorization: tokenBearer,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("data del getReportes de un user", data);
      if (data[0]) {
        cb(data);
        // cs.meReports = data;
      }

      // this.setState(cs);
    })
    .catch((error) => {
      console.error("eerrramos en algooo, no se q");
    });
}
export async function reportarMascota(token, datos: any, cb?) {
  // const idUsuario = cs.userId;
  const tokenBearer = "bearer " + token;
  fetch(API_BASE_URL + "/report-pet", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: tokenBearer,
    },
    body: JSON.stringify(datos),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      // cs.petReported.petName = data.petName;
      // cs.petReported.location = data.location;
      // cs.petReported.petImage = data.petImage;
      // cs.petReported.ownerEmail = data.ownerEmail;
      // this.setState(cs);
      cb(data);
    });
}
export async function sendEmail(mensaje, cb?) {
  fetch(API_BASE_URL + "/send-email", {
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ msg: mensaje }),
  })
    .then((res) => res.json())
    .then((data) => {
      cb(data);
    });
}
export async function editarMascota(token, datos: any, cb?) {
  const tokenBearer = "bearer " + token;
  fetch(API_BASE_URL + "/reportes/" + datos.petId, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      Authorization: tokenBearer,
    },
    body: JSON.stringify(datos),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      // cs.petReported.petName = data.petName;
      // cs.petReported.location = data.location;
      // cs.petReported.petImage = data.petImage;

      // this.setState(cs);
      cb(data);
    });
}
