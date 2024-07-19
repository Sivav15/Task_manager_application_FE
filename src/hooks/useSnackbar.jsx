// import { useState } from 'react';
// import { Snackbar, Alert } from '@mui/material';

// const useSnackbar = () => {
//     const [snackbar, setSnackbar] = useState({
//         open: false,
//         message: '',
//         severity: 'info', // 'error', 'warning', 'info', 'success'
//     });

//     const showSnackbar = (message, severity = 'info') => {
//         setSnackbar({
//             open: true,
//             message,
//             severity,
//         });
//     };

//     const closeSnackbar = (event, reason) => {
//         if (reason === 'clickaway') {
//             return;
//         }
//         setSnackbar({ ...snackbar, open: false });
//     };

//     const SnackbarComponent = () => (
//         <Snackbar
//             open={snackbar.open}
//             autoHideDuration={6000}
//             onClose={closeSnackbar}
//             anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//         >
//             <Alert onClose={closeSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
//                 {snackbar.message}
//             </Alert>
//         </Snackbar>
//     );

//     return { showSnackbar, SnackbarComponent };
// };

// export default useSnackbar;




import { useState, useCallback } from 'react';
import { Snackbar, Alert } from '@mui/material';

const useSnackbar = () => {
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'info', // 'error', 'warning', 'info', 'success'
    });

    const showSnackbar = useCallback((message, severity = 'info') => {
        setSnackbar({
            open: true,
            message,
            severity,
        });
    }, []);

    const closeSnackbar = useCallback((event, reason) => {
        // if (reason === 'clickaway') {
        //     return;
        // }
        setSnackbar(prevSnackbar => ({ ...prevSnackbar, open: false }));
    }, []);

    const SnackbarComponent = () => (
        <Snackbar
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={closeSnackbar}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
            <Alert onClose={closeSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                {snackbar.message}
            </Alert>
        </Snackbar>
    );

    return { showSnackbar, SnackbarComponent };
};

export default useSnackbar;
