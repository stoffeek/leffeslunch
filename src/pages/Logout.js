import React, { useEffect, useState, useRef } from 'react';
import './Logout.css';

const Logout = () => {
  const [isGlitching, setIsGlitching] = useState(false);
  const [showError, setShowError] = useState(false);
  const [fakeCode, setFakeCode] = useState([]);
  const consoleRef = useRef(null); 
  useEffect(() => {
    const fakeCodeSnippets = [
      "C:\\WINDOWS\\System32> Error: System file not found.",
      "C:\\WINDOWS\\System32> Warning: Critical files are missing.",
      "C:\\WINDOWS\\System32> Error: Unable to locate boot configuration data.",
      "C:\\WINDOWS\\System32> Corruption detected in system32 directory.",
      "C:\\WINDOWS\\System32> Attempting to restore missing files...",
      "C:\\WINDOWS\\System32> Restore failed: Backup corrupted.",
      "C:\\WINDOWS\\System32> Fatal error: No valid restore points found.",
      "C:\\WINDOWS\\System32> Warning: Malware detected in memory.",
      "C:\\WINDOWS\\System32> Access denied: Unauthorized access.",
      "C:\\WINDOWS\\System32> Critical error: Disk read failure.",
      "C:\\WINDOWS\\System32> Attempting to run repair tool...",
      "C:\\WINDOWS\\System32> Repair tool crashed unexpectedly.",
      "C:\\WINDOWS\\System32> Shutting down due to critical error.",
      "C:\\WINDOWS\\System32> System files corrupted. Unable to recover.",
      "C:\\WINDOWS\\System32> Warning: System integrity compromised.",
      "C:\\WINDOWS\\System32> System crash imminent...",
      "C:\\WINDOWS\\System32> Error: Unrecoverable disk error.",
      "C:\\WINDOWS\\System32> Loading kernel... Kernel missing.",
      "C:\\WINDOWS\\System32> Emergency shutdown initiated.",
      "C:\\WINDOWS\\System32> All user data may be lost.",
      "C:\\WINDOWS\\System32> Warning: Unauthorized changes detected.",
      "C:\\WINDOWS\\System32> Attempting to restore original settings...",
      "C:\\WINDOWS\\System32> Restore failed: Configuration data corrupted.",
      "C:\\WINDOWS\\System32> Panic: System has encountered a critical failure.",
      "C:\\WINDOWS\\System32> Fatal error: System has encountered an unrecoverable error.",
      "C:\\WINDOWS\\System32> Shutting down for safety.",
      "C:\\WINDOWS\\System32> System has crashed."
    ];

    let currentIndex = 0; 

    const timeout1 = setTimeout(() => {
      setIsGlitching(true);
      addFakeCode(); 
    }, 5000);

    const addFakeCode = () => {
      if (currentIndex < fakeCodeSnippets.length) {
        setFakeCode(prev => [...prev, fakeCodeSnippets[currentIndex]]);
        currentIndex++; 
     
        if (consoleRef.current) {
          consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
        }
        setTimeout(addFakeCode, 150); 
      }
    };

    const timeout2 = setTimeout(() => {
      setShowError(true); 
    }, 9500); 

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, []); 

  useEffect(() => {
    if (showError) {
      const crashTimeout = setTimeout(() => {
        window.location.href = 'http://localhost:3000'; 
      }, 10000); 

      return () => clearTimeout(crashTimeout); 
    }
  }, [showError]);

  return (
    <div className={`logout-container ${isGlitching ? 'glitch' : ''}`}>
      <div className="logout-message">
        {isGlitching ? (
          <>
            {showError ? (
              <div className="error-message">
                <h1>Uncaught runtime errors:</h1>
                <p>ERROR</p>
                <p>App Crashed: System Failure</p>
                <pre>{`    at Logout (http://localhost:3000/main.b126c698a0f4c019845c.hot-update.js:64:11)
    at renderWithHooks (http://localhost:3000/static/js/bundle.js:27145:22)
    at updateFunctionComponent (http://localhost:3000/static/js/bundle.js:30712:24)
    at beginWork (http://localhost:3000/static/js/bundle.js:32431:20)
    at HTMLUnknownElement.callCallback (http://localhost:3000/static/js/bundle.js:17401:18)
    at Object.invokeGuardedCallbackDev (http://localhost:3000/static/js/bundle.js:17445:20)
    at invokeGuardedCallback (http://localhost:3000/static/js/bundle.js:17502:35)
    at beginWork$1 (http://localhost:3000/static/js/bundle.js:37400:11)
    at performUnitOfWork (http://localhost:3000/static/js/bundle.js:36648:16)
    at workLoopSync (http://localhost:3000/static/js/bundle.js:36571:9)
ERROR
App Crashed: System Failure
    at Logout (http://localhost:3000/main.b126c698a0f4c019845c.hot-update.js:64:11)
    at renderWithHooks (http://localhost:3000/static/js/bundle.js:27145:22)
    at updateFunctionComponent (http://localhost:3000/static/js/bundle.js:30712:24)
    at beginWork (http://localhost:3000/static/js/bundle.js:32431:20)
    at HTMLUnknownElement.callCallback (http://localhost:3000/static/js/bundle.js:17401:18)
    at Object.invokeGuardedCallbackDev (http://localhost:3000/static/js/bundle.js:17445:20)
    at invokeGuardedCallback (http://localhost:3000/static/js/bundle.js:17502:35)
    at beginWork$1 (http://localhost:3000/static/js/bundle.js:37400:11)
    at performUnitOfWork (http://localhost:3000/static/js/bundle.js:36648:16)
    at workLoopSync (http://localhost:3000/static/js/bundle.js:36571:9)
ERROR
App Crashed: System Failure
    at Logout (http://localhost:3000/main.b126c698a0f4c019845c.hot-update.js:64:11)
    at renderWithHooks (http://localhost:3000/static/js/bundle.js:27145:22)
    at updateFunctionComponent (http://localhost:3000/static/js/bundle.js:30712:24)
    at beginWork (http://localhost:3000/static/js/bundle.js:32431:20)
    at beginWork$1 (http://localhost:3000/static/js/bundle.js:37378:18)
    at performUnitOfWork (http://localhost:3000/static/js/bundle.js:36648:16)
    at workLoopSync (http://localhost:3000/static/js/bundle.js:36571:9)
    at renderRootSync (http://localhost:3000/static/js/bundle.js:36544:11)
    at recoverFromConcurrentError (http://localhost:3000/static/js/bundle.js:36036:24)
    at performConcurrentWorkOnRoot (http://localhost:3000/static/js/bundle.js:35949:26)`}</pre>
              </div>
            ) : (
              <>
                <h1>Failed to Logout</h1>
                <div className="console-prompt" ref={consoleRef}>
                  {fakeCode.map((line, idx) => (
                    <span key={idx}>{line}<br /></span>
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <h1>Logging Out</h1>
            <p>Please wait...</p>
          </>
        )}
      </div>
      <div className={`logout-spinner ${isGlitching ? 'glitch-spinner' : ''}`}></div>
    </div>
  );
};

export default Logout;
