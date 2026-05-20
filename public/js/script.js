
const addlocationbtn = document.querySelector('#addlocationbtn');

addlocationbtn.addEventListener('click', (e) => {
    e.preventDefault();

    const joblocation = document.querySelector('.joblocation');

    const div = document.createElement('div');
    div.classList.add('col-md-6', 'mb-3');

    div.innerHTML = `
        <label class="form-label">Job Location</label>
        <input type="text"
            class="form-control"
            name="Job[jobLocation]"
            placeholder="Enter Job Location">
    `;

    joblocation.appendChild(div);
});



const refundfeeBtn = document.querySelector('#refundfeeBtn');

refundfeeBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const refunddiv = document.querySelector('.refunddiv');

    refunddiv.innerHTML += `
        <div class="row g-3 mt-2">
            <div class="col-md-2">
                <input type="number" class="form-control"
                name="Job[applicationFee][refund][general]" placeholder="General">
            </div>
            <div class="col-md-2">
                <input type="number" class="form-control"
                name="Job[applicationFee][refund][obc]" placeholder="OBC">
            </div>
            <div class="col-md-2">
                <input type="number" class="form-control"
                name="Job[applicationFee][refund][ews]" placeholder="EWS">
            </div>
            <div class="col-md-2">
                <input type="number" class="form-control"
                name="Job[applicationFee][refund][sc]" placeholder="SC">
            </div>
            <div class="col-md-2">
                <input type="number" class="form-control"
                name="Job[applicationFee][refund][st]" placeholder="ST">
            </div>
        </div>
    `;
});



let i = 1;
const zoneaddbtn = document.querySelector('#zoneaddbtn');

zoneaddbtn.addEventListener('click', (e) => {
    e.preventDefault();

    const addnewzone = document.querySelector('.addnewzone');

    addnewzone.innerHTML += `
        <div class="row g-3 border p-3 rounded mt-3">
            <div class="col-md-4">
                <input type="text" class="form-control"
                name="Job[zoneVacancies][${i}][zone]"
                placeholder="Zone / Post Name">
            </div>
            <div class="col-md-2">
                <input type="number" class="form-control"
                name="Job[zoneVacancies][${i}][general]" placeholder="Gen">
            </div>
            <div class="col-md-2">
                <input type="number" class="form-control"
                name="Job[zoneVacancies][${i}][ews]" placeholder="EWS">
            </div>
            <div class="col-md-2">
                <input type="number" class="form-control"
                name="Job[zoneVacancies][${i}][obc]" placeholder="OBC">
            </div>
            <div class="col-md-1">
                <input type="number" class="form-control"
                name="Job[zoneVacancies][${i}][sc]" placeholder="SC">
            </div>
            <div class="col-md-1">
                <input type="number" class="form-control"
                name="Job[zoneVacancies][${i}][st]" placeholder="ST">
            </div>
        </div>
    `;
    i++;
});



let j = 1;
const newstagebtn = document.querySelector('#newstagebtn');

newstagebtn.addEventListener('click', (e) => {
    e.preventDefault();

    const newstageadd = document.querySelector('.newstageadd');

    newstageadd.innerHTML += `
        <div class="card p-3 mt-3 shadow-sm">
            <div class="row g-3">

                <div class="col-md-6">
                    <label class="form-label">Negative Marking</label>
                    <select class="form-select"
                    name="Job[examStages][${j}][negativeMarking]">
                        <option disabled selected>Select</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>

                <div class="col-md-6">
                    <label class="form-label">Negative Marking Value</label>
                    <input type="text" class="form-control"
                    name="Job[examStages][${j}][negativeMarkingvalue]"
                    placeholder="Enter numbers">
                </div>

                <div class="col-md-6">
                    <label class="form-label">Stage Name</label>
                    <input type="text" class="form-control"
                    name="Job[examStages][${j}][name]"
                    placeholder="Shift-1">
                </div>

                <div class="col-md-6">
                    <label class="form-label">Exam Date</label>
                    <input type="date" class="form-control"
                    name="Job[examStages][${j}][examDate]">
                </div>

                <div class="col-md-6">
                    <label class="form-label">Admit Card Date</label>
                    <input type="date" class="form-control"
                    name="Job[examStages][${j}][admitCardDate]">
                </div>

                <div class="col-md-6">
                    <input type="text" class="form-control"
                    name="Job[examStages][${j}][answerKeyLink]"
                    placeholder="Answer Key Link">
                </div>

                <div class="col-md-6">
                    <input type="text" class="form-control"
                    name="Job[examStages][${j}][resultLink]"
                    placeholder="Result Link">
                </div>

                <div class="col-md-6">
                    <input type="text" class="form-control"
                    name="Job[examStages][${j}][noticePDF]"
                    placeholder="Notice PDF Link">
                </div>

            </div>
        </div>
    `;
    j++;
});



let k = 1;
const newsubBtn = document.querySelector('#newsubBtn');

newsubBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const newsubject = document.querySelector('.newsubject');

    newsubject.innerHTML += `
        <div class="row g-3 border p-3 rounded mt-3">
            <div class="col-md-3">
                <input type="text" class="form-control"
                name="Job[paperPattern][${k}][subject]"
                placeholder="Subject Name">
            </div>
            <div class="col-md-3">
                <input type="number" class="form-control"
                name="Job[paperPattern][${k}][questions]"
                placeholder="Questions">
            </div>
            <div class="col-md-3">
                <input type="number" class="form-control"
                name="Job[paperPattern][${k}][marks]"
                placeholder="Marks">
            </div>
            <div class="col-md-3">
                <input type="text" class="form-control"
                name="Job[paperPattern][${k}][duration]"
                placeholder="Duration">
            </div>
        </div>
    `;
    k++;
});

let stepIndex = 1;

const addNewStep = document.querySelector('#addNewStep');

addNewStep.addEventListener('click', (e) => {
    e.preventDefault();

    const stepAddDiv = document.querySelector('.stepAddDiv');

    const div = document.createElement('div');
    div.classList.add('row', 'g-3', 'mt-2', 'align-items-center');

    div.innerHTML = `
        <div class="col-md-10">
            <label class="form-label">Selection Step</label>
            <input type="text"
                class="form-control"
                name="Job[selectionProcess][${stepIndex}]"
                placeholder="Enter selection step">
        </div>
    `;

    stepAddDiv.appendChild(div);

    stepIndex++;
});


