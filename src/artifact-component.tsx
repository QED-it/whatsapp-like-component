import { useState } from 'react';
import { Lock } from 'lucide-react';

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
      detectedName: ''
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

  const handleNameChanged = () => {
    setState(prev => ({
      ...prev,
      nameChanged: true,
      confirmationMessage: '✓ Name change detected. Sending for verification...'
    }));

    setTimeout(() => {
      setState(prev => ({
        ...prev,
        confirmationMessage: '✓ Name change detected. Verification request sent!'
      }));
    }, 2000);
  };

  return (
    <div style={{ 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#0f1218',
      padding: '20px'
    }}>
      <div style={{ 
        width: '450px',
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
            To receive the funds, please change the required details on your flight ticket to:
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
            <div className="blinking-dot" style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#2ecc71'
            }} />
            Monitoring Connection ...
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
                marginBottom: '8px'
              }}>
                <span style={{ color: '#2ecc71' }}>✓</span>
                Detected name:
              </div>
              <div style={{
                display: 'inline-block',
                padding: '4px 8px',
                backgroundColor: '#FFD700',
                color: 'black',
                borderRadius: '4px',
                fontWeight: 'bold'
              }}>
                {state.detectedName}
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
              textAlign: 'center',
              color: '#2ecc71'
            }}>
              {state.confirmationMessage}
            </div>
          )}
        </div>
      </div>

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
