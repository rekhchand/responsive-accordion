//--------------------------------
// Editorial process Accordion
if(document.querySelector('#editorial-process .processes')) {

  const processes = document.querySelector('#editorial-process .processes');
  const steps = processes.querySelectorAll('.step');
  let mediaQuery = window.matchMedia("(min-width: 840px)");

  function activateStep(nodelist, forMaxHeight) {

    nodelist.forEach(step => {
      step.addEventListener('click', (e) => {

        if(!e.currentTarget.classList.contains('active')) {
          nodelist.forEach(step2 => {
            if(step2.classList.contains('active')){
              step2.classList.remove('active');
              if(forMaxHeight) {
                step2.style.maxHeight = "60px";
              }
            }
          })

          e.currentTarget.classList.add('active');
          
          if(forMaxHeight) {
            e.currentTarget.style.maxHeight = e.currentTarget.scrollHeight + "px";
          }

          let currentTitle = e.currentTarget.querySelector('.content-heading');
          let currentPara = e.currentTarget.querySelector('.para');

          gsap.from(currentTitle, {
            duration: 0.5,
            delay: 0.4,
            opacity: 0,
            y: 20,
          })
          gsap.from(currentPara, {
            duration: 0.5,
            delay: 0.5,
            opacity: 0,
            y: 20,
          })
        }

      });
    });

  }

  if(mediaQuery.matches) {
    let widthArray = [];

    steps.forEach(step => {
      let titleWidth = step.querySelector('.title').offsetWidth;
      widthArray.push(titleWidth);
    });

    const maxWidth = widthArray.reduce((a, b) => Math.max(a, b));
    processes.style.height = `${maxWidth + 2*21}px`;

    activateStep(steps, false);

  } else {

    const activeStep = processes.querySelector('.step.active');
    activeStep.style.maxHeight = activeStep.scrollHeight + "px";

    activateStep(steps, true);

  }
  
}