import Model from './Model.js';
import View from './View.js';


function RandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
class Controller {
    constructor(model, view) {
      this.model = model;
      this.view = view;

      this.intervalId = null;
      this.StartTimeClock();
    }

    async StartTimeClock(){
      setInterval(()=>{
          this.updateView();
      },1000)
    }

    async addProcess(processName) {
      let Memory_gens = this.model.getRemaining_memory();
      const process = { 
        processName: processName,
        arrivalTime: this.model.time,
        priority:  RandomNum(0,9),
        burstTime:  0,
        waitingTime: 0,
        RunningTime: 0,
        RespondTime: 0,
        memory_usage: RandomNum(1,Memory_gens),
        status: "New",
        statusIO: "NotUse"
      };
      this.view.ADDdisplayJobData(process);
      this.model.addProcess(process);
      this.UpdateControlblock();
      await new Promise(resolve => setTimeout(resolve, 1000)); // รอ 1 วินาที
    }


    // เมธอดสำหรับอัพเดทหน้า GUI
    async updateView() {
      this.view.StartClock(this.model.time);
      // อัพเดทตารางข้อมูลงาน
      this.view.updatedisplayJobData(this.model.getProcesses());
      // อัพเดทคิวของโปรเซสที่พร้อมทำงาน
      this.view.displayReadyQueue(this.model.getReadyQueue());
      // อัพเดทคิวของอุปกรณ์ I/O
      this.view.UpdatedisplayIOdevice(this.model.getIODevice());
      // อัพเดท Control Block
      this.UpdateControlblock();
      // อัพเดท IoQeueu
      this.view.displayIOqueue(model.getWaitingProcesses());
    }

    //  ------------------------
    // ส่วนของการนับ IO Processs
    //  ------------------------
    async addIOdevice(){
      this.model.addIODevice();
      this.updateView() 
      this.UpdateControlblock() // update Controlblock
    }

    async DeleteIOdevice(){
      this.model.DeleteIOdevice();
      this.view.updatedisplayJobData(this.model.getProcesses());
      this.view.UpdatedisplayReadyQueue(this.model.getIODevice());
      this.UpdateControlblock() // update Controlblock
    }

    async Terminate(){
      try {
        const {runningProcesses,TurnaroundTime} = await this.model.Terminate();
        this.view.displayTerminate(runningProcesses[0],TurnaroundTime);
        this.view.updatedisplayJobData(this.model.getProcesses());
        this.UpdateControlblock();
      }catch(error){
        notyf.error('There are no processes using the CPU.');
      }
    }

    // -----------------------
    // ส่วนของ control bloack
    // -------------------------
  
    async UpdateControlblock() {
      const { CheckrunningProcesses, CheckIOrunningProcesses, AVGTurnaround, AVGWaitingTime, memory } = await this.model.UpdateControlblock();
      this.view.UpdateControlBlock(CheckrunningProcesses, CheckIOrunningProcesses, AVGTurnaround, AVGWaitingTime, memory);
    }
  
}

  const model = new Model(); 
  const view = new View();
  const Control = new Controller(model, view);



  // -------------------
  // ส่วนของ PCB
  // -------------------
  const head_main_left = document.querySelector('.head-main-left');
  const Addprocess = head_main_left.querySelector('.add');
  const Terminate  = head_main_left.querySelector('.Terminate');
  let process_num = 1;
  Addprocess.addEventListener('click',() =>{
    Control.addProcess(`Process`+process_num);
    process_num++;
  })
  Terminate.addEventListener('click', () =>{
    Control.Terminate();
  })

  // -------------------
  // ส่วนของ IO device
  // -------------------
  const main_right_bottom = document.querySelector('.main-right-bottom');
  const AddIO = main_right_bottom.querySelector('.add');
  const DeleetIO = main_right_bottom.querySelector('.delete');
  AddIO.addEventListener('click', () =>{
    Control.addIOdevice();
  });
  DeleetIO.addEventListener('click', () =>{
    Control.DeleteIOdevice()
  })



  // ------------------------
  // แสดง Menu Active
  // ------------------------

  const icon_menu = document.getElementById('menu');
  const menu = document.querySelector('.detail-Controller');
  icon_menu.addEventListener('click', () => {
    menu.classList.toggle('active');
  });
  

  const reset = document.querySelector('.reset');
  reset.addEventListener('click',() =>{
    window.location.reload();
  })