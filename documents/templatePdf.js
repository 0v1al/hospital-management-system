module.exports = data => {
  const date = new Date(data.date);
  let visitDate;
  if (data.medicalHistories.length > 0) {
    visitDate = new Date(data.medicalHistories[0].date);
    visitDate = `${visitDate.getFullYear()}/${visitDate.getMonth()}/${visitDate.getDay()}`;
  } else {
    visitDate = "---";
  }
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title></title>
        <style>
          .universalContainer {
            width: 100%;
            max-width: 960px;
            margin: 0 auto;
            padding: 3rem 0;
          }
          .universalTitle {
            text-transform: uppercase;
            font-size: 1.6rem;
            color: rgba(0, 0, 0, .7);
            letter-spacing: .1rem;
            font-weight: 400;
            position: relative;
            margin-bottom: 5rem;
          }
          .patients {  
            padding-bottom: 3rem;
            border-bottom: 1px solid rgb(8, 194, 67);
            color: rgba(0, 0, 0, .7);
          }
          .patient p {
            line-height: 3;
            font-size: 1.3rem;
          }
          .patient {
            position: relative; 
            display: inline-block;
            margin-right: 6rem;
          }
          .universalTitle::before {
            content: "";
            position: absolute;
            background-color: rgb(8, 194, 67);
            width: 8rem;
            height: .13rem;
            bottom: -.8rem;
            border-radius: .1rem;
          }
          .universalContainerTableNoBorder { border-top: none; }
          .universalTable {
            margin-top: 1.5rem;
            border-collapse: collapse;
            background-color: rgba(8, 194, 67, .1);
            overflow: hidden;
            width: 500px;
            border-radius: .2rem;
            box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, .2);
            width: 100%;
            min-height: 10rem;
            position: relative;
          }
          .containerTable {
            margin-top: 1rem !important;
          }
          .universalTableRow:nth-child(odd) { background-color: rgba(8, 194, 67, 0.144); }
          .universalTableRow th {
            background-color: rgb(8, 194, 67);
            color: #fff;
            font-weight: 100 !important;
          }

          .universalTableRow th, .universalTableRow td {
            text-align: left;
            padding: 10px;
            font-size: 1.3rem;
          }
          .universalDesc {
            color: rgba(0, 0, 0, .7);
            text-transform: uppercase;
            font-weight: 100;
            font-size: 1.3rem;
            margin-bottom: 1.5rem;
          }
          .desc {
            font-size: 1.3rem !important;
            margin-top: 3rem;
          }
          .desc i {
            margin-right: .5rem;
            color: rgb(8, 194, 67);
          }
        </style>
      </head>
      <body>
        <div class="universalContainer">
          <h1 class="universalTitle">
              <i className="fas fa-user-edit"></i>
              Patient Details
          </h1>
          <div class="patients">
            <div class="patient">
                <p><strong>Patient Name:</strong></p>
                <p><strong>Patient Contact:</strong></p>
                <p><strong>Patient Gender:</strong></p>
                <p><strong>Patient Disease:</strong></p>
            </div>
            <div class="patient">
                <p>${data.firstname} ${data.lastname}</p>
                <p>${data.contact}</p>
                <p>${data.male ? "Male" : "Female"}</p>
                <p>${data.medicalHistory ? data.medicalHistory : "---"}</p>
            </div></br>
            <div class="patient">
                <p><strong>Patient Email:</strong></p>
                <p><strong>Patient Address:</strong></p>
                <p><strong>Patient Age:</strong></p>
                <p><strong>Patient Reg Date:</strong></p>
            </div>
            <div class="patient">
                <p>${data.email}</p>
                <p>${data.address}</p>
                <p>${data.age}</p>
                <p>${date.getFullYear()}/${date.getMonth() + 1}/${date.getDay()}</p>
            </div>
          </div>
          <div class="universalContainerTableNoBorder containerTable">
            <h3 class="universalDesc desc">
              <i class="fas fa-notes-medical"></i>
              The Most Recent Medical History
            </h3>
            <table class="universalTable">
              <thead>
                  <tr class="universalTableRow">
                    <th>Blood Pressure</th>
                    <th>Weight</th>
                    <th>Blood Sugar</th>
                    <th>Body Temperature</th>
                    <th>Medical Prescription</th>
                    <th>Visit Date</th>
                  </tr>
              </thead>
              <tbody>
                <tr class="universalTableRow" >
                  <td>${data.medicalHistories.length > 0 ? data.medicalHistories[0].bloodPressure : "---"}</td>
                  <td>${data.medicalHistories.length > 0 ? data.medicalHistories[0].weight : "---"}</td>
                  <td>${data.medicalHistories.length > 0 ? data.medicalHistories[0].bloodSugar : "---"}</td>
                  <td>${data.medicalHistories.length > 0 ? data.medicalHistories[0].bodyTemperature : "---"}</td>
                  <td>${data.medicalHistories.length > 0 && data.medicalHistories[0].prescription ? data.medicalHistories[0].prescription : "---"}</td>
                  <td>${visitDate}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </body>
    </html>
  `;
};
