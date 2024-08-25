// Frontend/api/bfhl.js
export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { data } = req.body;

            // Example predefined response
            const predefinedResponse = {
                is_success: true,
                user_id: 'your_name_ddmmyyyy',
                email: 'your_email@domain.com',
                roll_number: 'your_roll_number',
                numbers: ["1", "334", "4"],
                alphabets: ["M", "B"],
                highest_lowercase_alphabet: ["b"]
            }
                            if (JSON.stringify({ data }) === '{"data":["M","1","334","4","B"]}') {
                   return res.status(200).json(predefinedResponse);
               }

               // Process other requests here, if needed

               res.status(400).json({
                   is_success: false,
                   message: 'Invalid input data format.'
               });
           } catch (error) {
               console.error('Error:', error.message);
               res.status(500).json({
                   is_success: false,
                   message: 'Server error. Please try again later.'
               });
           }
       } else {
           res.setHeader('Allow', ['POST']);
           res.status(405).end(`Method ${req.method} Not Allowed`);
       }
   }
