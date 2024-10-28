import { useState } from 'react';
import { Lock } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AppState {
  copyingField: string;
  websiteVisited: boolean;
  nameChanged: boolean;
  confirmationMessage: string;
  showScanning: boolean;
  loading: boolean;
  detectedName: string;
  monitoringActive: boolean;
}

const TicketChangeApp = () => {
  const [state, setState] = useState<AppState>({
    copyingField: '',
    websiteVisited: false,
    nameChanged: false,
    confirmationMessage: '',
    showScanning: false,
    loading: false,
    detectedName: '',
    monitoringActive: false
  });

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setState(prev => ({ ...prev, copyingField: field }));
    setTimeout(() => setState(prev => ({ ...prev, copyingField: '' })), 2000);
  };

  const handleScanWebsite = () => {
    setState(prev => ({
      ...prev,
      loading: true,
      showScanning: false,
      websiteVisited: false,
      detectedName: '',
      monitoringActive: true
    }));

    // Simulate website loading and scanning
    setTimeout(() => {
      setState(prev => ({
        ...prev,
        loading: false,
        showScanning: true
      }));

      // Show detected name after scanning
      setTimeout(() => {
        setState(prev => ({
          ...prev,
          websiteVisited: true,
          detectedName: 'Jonathan Rouach'
        }));
      }, 2000);
    }, 1500);
  };

  const fireConfetti = () => {
    // Calculate origin.x based on panel width (450px) relative to window width
    const panelWidth = 450;
    const windowWidth = window.innerWidth;
    const rightPanelStart = (windowWidth - panelWidth) / windowWidth;

    // Left corner of panel
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { 
        x: rightPanelStart, // Position at left edge of panel
        y: 0.9 
      },
      colors: ['#4a90e2', '#2ecc71', '#FFD700'],
      gravity: 0.8,
      angle: 60
    });

    // Right corner of panel
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { 
        x: 1, // Right edge of screen
        y: 0.9 
      },
      colors: ['#4a90e2', '#2ecc71', '#FFD700'],
      gravity: 0.8,
      angle: 120
    });
  };

  const handleNameChanged = () => {
    setState(prev => ({
      ...prev,
      nameChanged: true,
      confirmationMessage: 'Detecting correct name change... '
    }));

    setTimeout(() => {
      setState(prev => ({
        ...prev,
        detectedName: 'Yaniv Raveh',
        confirmationMessage: prev.confirmationMessage + '✓ \nCreating proof... '
      }));
    }, 1000);

    setTimeout(() => {
      setState(prev => ({
        ...prev,
        confirmationMessage: prev.confirmationMessage + '✓\nVerifying proof...'
      }));
    }, 5000);

    setTimeout(() => {
      setState(prev => ({
        ...prev,
        confirmationMessage: prev.confirmationMessage + '✓\n\nSuccess! The funds will be released shortly.'
      }));
      
      // Fire initial confetti
      fireConfetti();

    }, 6000);
  };

  const QeditLogo = () => (
    <svg width="70" height="40" viewBox="0 0 140 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g xmlns="http://www.w3.org/2000/svg" id="Group_1111" data-name="Group 1111" >
        <path id="Path_633" data-name="Path 633" d="M48.507,2669.484c0-9.044-6.907-15.8-16.26-15.8-9.322,0-16.2,6.752-16.2,15.8s6.876,15.795,16.2,15.795a17.738,17.738,0,0,0,5.642-.922v-8.664a7.886,7.886,0,0,1-5.43,2.059c-4.553,0-7.959-3.406-7.959-8.269s3.407-8.27,7.959-8.27a7.87,7.87,0,0,1,7.99,8.27h0v13.8h0v12.133h8.052v-25.469l-.006,0C48.5,2669.79,48.507,2669.637,48.507,2669.484Z" transform="translate(-16.049 -2643.551)" fill="#fff"/>
        <path id="Path_634" data-name="Path 634" d="M494.234,2666.456h13.287c-.743-3.841-3.066-6.008-6.535-6.008-3.81,0-6.04,2.292-6.752,6.008m21.4,2.788a23.239,23.239,0,0,1-.155,2.725H494.2c.867,4.336,3.9,6.225,7.712,6.225a12.136,12.136,0,0,0,7.588-2.88l4.739,5.2c-3.407,3.128-7.743,4.552-12.791,4.552-9.2,0-15.578-6.256-15.578-15.7s6.194-15.889,15.176-15.889c8.641,0,14.556,6.412,14.588,15.765" transform="translate(-451.083 -2643.358)" fill="#fff"/>
        <g id="Group_1110" data-name="Group 1110" transform="translate(104.685 0)">
          <rect id="Rectangle_193" data-name="Rectangle 193" width="8.084" height="30.819" transform="translate(0 10.118)" fill="#fff"/>
          <rect id="Rectangle_194" data-name="Rectangle 194" width="8.084" height="7.101" fill="#fff"/>
        </g>
        <path id="Path_635" data-name="Path 635" d="M1629.3,2534.1h-9.456v11.771c0,3.748,1.982,5.111,4.491,5.111a11.733,11.733,0,0,0,5.637-1.951l2.974,6.318A16.749,16.749,0,0,1,1623,2558.5c-7.434,0-11.243-4.212-11.243-9.761v-31.95h8.083v10.118h9.456Z" transform="translate(-1493.603 -2516.792)" fill="#fff"/>
        <path id="Path_636" data-name="Path 636" d="M951.14,2516.792h-8.052v12.133a17.212,17.212,0,0,0-8.207-2c-9.323,0-16.2,6.752-16.2,15.8s6.876,15.795,16.2,15.795c9.353,0,16.26-6.751,16.26-15.795,0-.154,0-.307-.006-.459l.006,0Zm-16.26,34.2c-4.553,0-7.959-3.407-7.959-8.27s3.407-8.269,7.959-8.269a8.274,8.274,0,0,1,0,16.539Z" transform="translate(-851.844 -2516.792)" fill="#fff"/>
      </g>  
    </svg>
  );
  return (
    <div style={{ 
      display: 'flex',
      width: '100vw',
      height: '100vh',
      position: 'fixed',
      top: 0,
      left: 0,
      flexDirection: 'row-reverse'
    }}>
      {/* Original app content */}
      <div style={{ 
        width: '450px',
        height: '100vh',
        backgroundColor: '#0f1218',
        overflowY: 'auto',
        padding: '20px'
      }}>
        <div style={{ 
          width: '100%',
          backgroundColor: '#1C1C1C',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          color: 'white'
        }}>
          {/* Header */}
          <div style={{
            padding: '12px 20px',
            borderBottom: '1px solid #333',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#242424'
          }}>
            <span>QEDIT Web Prover</span>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: '12px' }}>
              <span>🔈</span>
              <span>✕</span>
            </div>
          </div>

          {/* Main Content */}
          <div style={{ padding: '20px' }}>
            {/* Locked Deposit Message */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '16px'
            }}>
              <Lock size={16} style={{ color: '#FFD700' }} />
              <span>
                Yaniv Raveh has made a locked deposit of{' '}
                <span style={{ color: '#FFD700' }}>₪555</span>
              </span>
            </div>

            <p style={{ 
              color: '#ccc',
              marginBottom: '20px'
            }}>
              To receive the funds, <br />Please change the passenger details to:
            </p>

            {/* Details Box */}
            <div style={{
              border: '1px solid #4a90e2',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '20px',
              backgroundColor: '#242424'
            }}>
              <div style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '8px'
              }}>
                <span>First Name: <strong>Yaniv</strong></span>
                <button 
                  onClick={() => handleCopy('Yaniv', 'firstName')}
                  style={{
                    padding: '2px 12px',
                    backgroundColor: '#4a90e2',
                    border: 'none',
                    borderRadius: '4px',
                    color: 'white',
                    cursor: 'pointer'
                  }}
                >
                  {state.copyingField === 'firstName' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              
              <div style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '8px'
              }}>
                <span>Last Name: <strong>Raveh</strong></span>
                <button 
                  onClick={() => handleCopy('Raveh', 'lastName')}
                  style={{
                    padding: '2px 12px',
                    backgroundColor: '#4a90e2',
                    border: 'none',
                    borderRadius: '4px',
                    color: 'white',
                    cursor: 'pointer'
                  }}
                >
                  {state.copyingField === 'lastName' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              
              <div style={{ marginBottom: '8px' }}>
                Gender: <strong>Male</strong>
              </div>
              
              <div>
                Age Group: <strong>Adult</strong>
              </div>
            </div>

            {/* Monitoring Connection Button */}
            <button
              onClick={handleScanWebsite}
              disabled={state.nameChanged}
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#4a90e2',
                border: 'none',
                borderRadius: '4px',
                color: 'white',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: state.nameChanged ? 'not-allowed' : 'pointer',
                opacity: state.nameChanged ? 0.5 : 1,
              }}
            >
              {state.monitoringActive ? (
                <>
                  <div className="blinking-dot" style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#2ecc71'
                  }} />
                  Monitoring Connection ...
                </>
              ) : (
                <>Connect to witch-air.com</>
              )}
            </button>

            {/* Loading/Scanning Messages */}
            {state.loading && (
              <div style={{ textAlign: 'center', marginBottom: '16px', color: '#ccc' }}>
                Loading website...
              </div>
            )}

            {state.showScanning && !state.websiteVisited && (
              <div style={{ textAlign: 'center', marginBottom: '16px', color: '#ccc' }}>
                <span style={{
                  display: 'inline-block',
                  width: '20px',
                  height: '20px',
                  border: '3px solid rgba(255, 255, 255, 0.1)',
                  borderTopColor: '#4a90e2',
                  borderRadius: '50%',
                  animation: 'spin 1s ease-in-out infinite',
                  marginRight: '8px',
                  verticalAlign: 'middle'
                }} />
                Scanning data...
              </div>
            )}

            {/* Detected Name */}
            {state.detectedName && (
              <div style={{ marginBottom: '16px' }}>
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#ccc',
                  marginBottom: '8px',
                  justifyContent: 'center'  // Center the "Detected name" text
                }}>
                  <span style={{ color: '#2ecc71' }}>✓</span>
                  Detected name:
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'center'  // Center the name container
                }}>
                  <div style={{
                    padding: '8px 16px',
                    border: '2px solid #FFD700',
                    color: '#FFD700',
                    borderRadius: '4px',
                    fontWeight: 'bold',
                    backgroundColor: 'transparent'  // Empty interior
                  }}>
                    {state.detectedName}
                  </div>
                </div>
              </div>
            )}

            {/* Change Details Button */}
            <button
              onClick={handleNameChanged}
              disabled={!state.websiteVisited || state.nameChanged}
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#4a90e2',
                border: 'none',
                borderRadius: '4px',
                color: 'white',
                cursor: (!state.websiteVisited || state.nameChanged) ? 'not-allowed' : 'pointer',
                opacity: (!state.websiteVisited || state.nameChanged) ? 0.5 : 1
              }}
            >
              I've changed the flight details!
            </button>

            {/* Confirmation Message */}
            {state.confirmationMessage && (
              <div style={{ 
                marginTop: '16px',
                textAlign: 'left',
                color: '#2ecc71',
                whiteSpace: 'pre-line'  // This ensures line breaks are respected
              }}>
                {state.confirmationMessage}
              </div>
            )}

            {/* Verification Logo */}
            <div style={{
              marginTop: '32px',
              display: 'flex',
              alignItems: 'center',  // Changed from 'right' to 'center'
              justifyContent: 'right',
              gap: '8px',
              color: 'white',
              fontSize: '14px'
            }}>
              <span style={{ 
                display: 'flex', 
                alignItems: 'center'  // Added to vertically center the text
              }}>
                Verified by
              </span>
              <QeditLogo />
            </div>
          </div>
        </div>
      </div>

      {/* Website iframe */}
      {state.monitoringActive && (
        <div style={{
          flex: 1,
          height: '100%',
          borderLeft: '1px solid #333'
        }}>
          <iframe 
            src="https://www.witch-air.com"
            style={{
              width: '100%',
              height: '100%',
              border: 'none'
            }}
            title="Witch Air Website"
          />
        </div>
      )}

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        @keyframes blink {
          0% { opacity: 0; }
          50% { opacity: 1; }
          100% { opacity: 0; }
        }
        
        .blinking-dot {
          animation: blink 1s infinite;
        }
      `}</style>
    </div>
  );
};

export default TicketChangeApp;
