import React, {useState, useRef, useEffect} from 'react';
import './App.css';
import './fonts/subway-ticker.regular.ttf'
import './fonts/01-digit.regular.ttf'
import './fonts/exepixelperfect.medium.ttf'
import "./fonts/LcdSolid-VPzB.ttf"
import "./fonts/dot_digital-7.ttf"

var TimeScreen = () => {
  var date = new Date()
  var [hour, setHour] = useState<string>(date.getHours().toString()+':'+date.getMinutes().toString())
  var [countdown, setCountdown] = useState<number>(300)
  var reset = useRef<number>(100+Math.floor(Math.random() * 200))

  useEffect(() => {
    const interval = setInterval(() => {
      var currentHour = date.getHours()+':'
      var minutes = date.getMinutes()
      currentHour += minutes < 10 ? '0' + minutes.toFixed() : minutes.toFixed()
      setHour(currentHour)
      var currentCountdown = countdown-1
      setCountdown(currentCountdown)
      if (currentCountdown === reset.current) {
        setCountdown(300)
        reset.current = 100+Math.floor(Math.random() * 200)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [countdown, date])

  var printCountdown = (time: number) => {
    var minutes = Math.floor(time/60)
    var seconds = time%60
    var text = minutes.toFixed()+':'
    text = (seconds < 10) ? text+"0"+seconds.toFixed() : text+seconds.toFixed()
    return text
  } 

  return (
    <div className='timeContainer'>
      <div className='firstRow'>
        <p className='time'>{hour}</p>
        <div className='direction'>
          <p className='next-train'>PROPER<br/>TREN</p>
          <p className='countdown'>{printCountdown(countdown)}</p>
        </div>
      </div>
      <div className='secondRow'>
        <p className='direction-text'>DIRECCIÓ TRINITAT NOVA</p>
      </div>
    </div>
  );
}

var Message = () => {
  return (
    <p className='message'>
      SI ET TROBES MALAMENT <br/>
      DEMANA AJUDA <br/>
      UTILITZANT ELS INTÈRFONS <br/>
      DE L'ESTACIÓ
    </p>
  )
}

var App = () => {
  var [showMessage, setShowMessage] = useState<boolean>(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setShowMessage(true)
      setTimeout(()=>{
        setShowMessage(false)
      }, 5000)
    }, 20000)
    return () => clearInterval(interval)
  }, [showMessage])

  return (
    <div className='background'>
      <div className='container'>
        <TimeScreen />
        {showMessage ?  <Message /> : <></>}
      </div>
    </div>
  );
}

export default App;

