//DeliverOption collection in the mongodb database
const DeliverOption = require("../models/DeliverOption.js");

/**
 * @disc Get all delivery options with calculated delivery dates from MongoDB
 * @route GET /deliverOptions
 * @access Public
 * @returns {Array} - The list of delivery options with estimated delivery dates
 */

const getAllDeliverOptions = async (req, res) => {
    try {
        const deliverOptions = await DeliverOption.find();
        const currentDate = new Date();
        
        // Calculate delivery dates for each option
        const deliverOptionsWithDates = deliverOptions.map(option => {
            const estimatedDeliveryDate = new Date(currentDate);
            estimatedDeliveryDate.setDate(currentDate.getDate() + option.estimatedDays);
            
            return {
                ...option.toObject(),
                estimatedDeliveryDate: estimatedDeliveryDate.toLocaleDateString('en-US'),
                estimatedTime: `${option.estimatedDays} day${option.estimatedDays > 1 ? 's' : ''} (arrives by ${estimatedDeliveryDate.toLocaleDateString('en-US')})`,
                orderToday: `Order today, get it by ${estimatedDeliveryDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'short', 
                    day: 'numeric' 
                })}`,
                priceFormatted: `$${(option.priceCents / 100).toFixed(2)}`
            };
        });
        
        res.json(deliverOptionsWithDates);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// export the controllers
module.exports = { getAllDeliverOptions };

