class View {
  constructor() {
    this.jobDataTable = document.getElementById('job-table').querySelector('.data-table');  // jobQueue
    this.readyQueueTable = document.querySelector('.main-right').querySelector('.data-table'); // ReadyQueue
    this.ioDeviceTable = document.querySelector('.main-right-bottom').querySelector('.data-table'); //IO Device
    this.main_middleTable = document.querySelector('.main-middle').querySelector('.data-table'); // IO Queue
    this.main_left_bottom = document.querySelector('.main-left-bottom').querySelector('.data-table'); // Terminate
    this.container_header = document.querySelector('.container-header').querySelector('.detail-Controller .wrapper') // control block

    this.Clock = document.getElementById('Clock');
  }


  async StartClock(time){
    this.Clock.innerHTML = time;
  }

  async ADDdisplayJobData(process){
    let insert_job_data_table = `<ul>
                                  <li id="Process-Name-${process.processName}">${process.processName}</li>
                                  <li id="Arrival-Time-${process.processName}">${process.arrivalTime}</li>
                                  <li id="Priority-${process.processName}">${process.priority}</li>
                                  <li id="Burst-Time-${process.processName}">${process.burstTime}</li>
                                  <li id="Waiting-Time-${process.processName}">${process.waitingTime}</li>
                                  <li>${process.memory_usage} KB</li>
                                  <li id="Status-Process${process.processName}" class="Status-Process" id="Status-Process${process.processName}">${process.status}</li>
                                </ul>`;
    this.jobDataTable.insertAdjacentHTML("beforeend", insert_job_data_table);
  }

  async updatedisplayJobData(process) {
    this.jobDataTable.innerHTML = '';
    process.forEach(process =>{
    let insert_job_data_table = `<ul>
                                  <li id="Process-Name-${process.processName}">${process.processName}</li>
                                  <li id="Arrival-Time-${process.processName}">${process.arrivalTime}</li>
                                  <li id="Priority-${process.processName}">${process.priority}</li>
                                  <li id="Burst-Time-${process.processName}">${process.burstTime}</li>
                                  <li id="Waiting-Time-${process.processName}">${process.waitingTime}</li>
                                  <li>${process.memory_usage} KB</li>
                                  <li id="Status-Process${process.processName}" class="Status-Process" id="Status-Process${process.processName}">${process.status}</li>
                                </ul>`;
    this.jobDataTable.insertAdjacentHTML("beforeend", insert_job_data_table);
    });
    this.setColor();
  }

  async displayReadyQueue(readyQueue) {
    this.readyQueueTable.innerHTML = '';
    readyQueue.forEach(process => {
      let data_table_insertion = `<ul>
                                    <li>${process.processName}</li>
                                    <li>${process.arrivalTime}</li>
                                    <li>${process.priority}</li>
                                  </ul>`;
      this.readyQueueTable.innerHTML += data_table_insertion;
    });
  }

  async displayIOdevice(process){
    let ioDeviceTable_insertion =`<ul>
                                    <li id="IO_Process_Name-${process.processName}">${process.processName}</li>
                                    <li id="Running-Time-${process.processName}">${process.RunningTime}</li>
                                    <li id="Respond-Time-${process.processName}">${process.RespondTime}</li>
                                    <li id="Status-Process${process.processName}" class="Status-Process" id="Status-Process${process.processName}">${process.statusIO}</li>
                                  </ul>`;
    this.ioDeviceTable.innerHTML += ioDeviceTable_insertion;
    this.setColor();
  }

  async UpdatedisplayIOdevice(process){
    this.ioDeviceTable.innerHTML = '';
    process.forEach(process=>{
      let ioDeviceTable_insertion =`<ul>
                                      <li id="IO_Process_Name-${process.processName}">${process.processName}</li>
                                      <li id="Running-Time-${process.processName}">${process.RunningTime}</li>
                                      <li id="Respond-Time-${process.processName}">${process.RespondTime}</li>
                                      <li id="Status-Process${process.processName}" class="Status-Process" id="Status-Process${process.processName}">${process.statusIO}</li>
                                    </ul>`;
      this.ioDeviceTable.insertAdjacentHTML("beforeend",ioDeviceTable_insertion);
    })
    this.setColor();
  }

  async UpdatedisplayReadyQueue(process){
    this.ioDeviceTable.innerHTML = '';
    process.forEach(process =>{
      let ioDeviceTable_insertion =`<ul>
            <li id="IO_Process_Name-${process.processName}">${process.processName}</li>
            <li id="Running-Time-${process.processName}">${process.RunningTime}</li>
            <li id="Respond-Time-${process.processName}">${process.RespondTime}</li>
            <li id="Status-Process${process.processName}" class="Status-Process" id="Status-Process${process.processName}">${process.statusIO}</li>
          </ul>`;
      this.ioDeviceTable.innerHTML += ioDeviceTable_insertion;
    });
    this.setColor();
  }

  async displayIOqueue(IOqueue){
    this.main_middleTable.innerHTML = '';
    IOqueue.forEach(process => {
      let main_middleTable_insertion = `<ul>
                                          <li>${process.processName}</li>
                                          <li>${process.arrivalTime}</li>
                                          <li>${process.priority}</li>
                                        </ul>`;
      this.main_middleTable.innerHTML += main_middleTable_insertion;
    });
  }

  async displayTerminate(process,TurnaroundTime){
    let main_left_bottom_insertion = `<ul>
                                          <li>${process.processName}</li>
                                          <li>${process.arrivalTime}</li>
                                          <li>${process.priority}</li>
                                          <li>${process.burstTime}</li>
                                          <li>${process.waitingTime}</li>
                                          <li>${TurnaroundTime}</li>
                                          <li>${process.RunningTime}</li>
                                          <li>${process.RespondTime}</li>
                                          <li class="Terminated">&nbsp;Terminate</li>
                                      </ul>`;
    this.main_left_bottom.insertAdjacentHTML("beforeend",main_left_bottom_insertion);
  }

  async UpdateControlBlock(processName,IOprocessName,AVGTurnaround,AVGWaiting,Memory){
    let container_header_insertion = `
                                    <li><span>CPU Process :</span><span id="Current-CPU-Process">${processName}</span></li>
                                    <li><span>I/O Process :</span><span id="Current-IO-Process">${IOprocessName}</span></li>
                                    <li><span>AVG Waitting :</span><span id="Current-AVG-Waiting">${AVGTurnaround}</span></li>
                                    <li><span>AVG Turnaround :</span><span id="Current-AVG-Turnaround">${AVGWaiting}</span></li>
                                    <li><span>Memory :</span> ${Memory}%</li>
                                    <li><span>Starvation :</span> 30 second</li>`;
    this.container_header.innerHTML = container_header_insertion;
  }

  setColor() {
    const jobData = document.querySelectorAll('.Status-Process');
    jobData.forEach((content, i) => {
      if (content.innerHTML === 'Running') {
        content.style.backgroundColor = '#02d171';
        content.style.color = 'black';
      } else if (content.innerHTML === 'Ready') {
        content.style.backgroundColor = '#F7F749';
        content.style.color = 'black';
      } else if (content.innerHTML === 'Waiting') {
        content.style.backgroundColor = '#FF8C00';
        content.style.color = 'black';
      }
    });
  }
}

export default View; 


