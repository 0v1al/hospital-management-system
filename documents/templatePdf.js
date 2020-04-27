module.exports = data => {
  const today = new Date();
  const date = new Date(data.date);
  const visitDate = new Date(data.medicalHistories[0].date);
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
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            padding-bottom: 3rem;
            border-bottom: 1px solid rgb(8, 194, 67);
            color: rgba(0, 0, 0, .7);;
          }
          .patient p {
            line-height: 3;
            font-size: 1.3rem;
          }
          .patient:nth-child(odd) {
            font-weight: bold;
          }
          .patient {
            position: relative; 
            display: inline-block;
          }
          .patient:not(:last-child) {
            margin-right: 5rem;
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
                <p>Patient Name:</p>
                <p>Patient Contact:</p>
                <p>Patient Gender:</p>
                <p>Patient Medical History:</p>
            </div>
            <div class="patient">
                <p>${data.firstname} ${data.lastname}</p>
                <p>${data.contact}</p>
                <p>${data.male ? "Male" : "Female"}</p>
                <p>${data.medicalHistory ? data.medicalHistory : "---"}</p>
            </div>
            <div class="patient">
                <p>Patient Email:</p>
                <p>Patient Address:</p>
                <p>Patient Age:</p>
                <p>Patient Reg Date:</p>
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
                  <td>${data.medicalHistories[data.medicalHistories.length - 1].bloodPressure}</td>
                  <td>${data.medicalHistories[data.medicalHistories.length - 1].weight}</td>
                  <td>${data.medicalHistories[data.medicalHistories.length - 1].bloodSugar}</td>
                  <td>${data.medicalHistories[data.medicalHistories.length - 1].bodyTemperature}</td>
                  <td>${data.medicalHistories[data.medicalHistories.length - 1].prescription ? data.medicalHistories[0].prescription : "---"}</td>
                  <td>${visitDate.getFullYear()}/${visitDate.getMonth() + 1}/${visitDate.getDay()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </body>
    </html>
  `;
};
