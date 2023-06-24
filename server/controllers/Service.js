const Service = require("../models/Services");
const ErrorHandler = require("../utils/ErrorHandler");

class ServiceController {

    static searchService = async (req, res, next) => {

        try {

            const { serviceName } = req.query;
            const regex = new RegExp(serviceName, "i");

            const result = await Service.find({ serviceType: regex });

            if (result.length === 0 || !result) return next(new ErrorHandler(`No result for ${serviceName}`, 404));

            return res.status(200).json({
                success: true,
                status: 200,
                message: "Service found",
                totalServices: result.length,
                result
            })

        } catch (error) {
            console.log("error in search service", error.message);
            next(new ErrorHandler())
        }

    }

    // create service 

    static createService = async (req, res, next) => {

        try {

            const { serviceType, serviceCharge, serviceDescription } = req.body;

            if (!serviceType || !serviceCharge || !serviceDescription) return next(new ErrorHandler("All fields are required", 401));

            const { id } = req.user;

            let service = await Service.find({ serviceType, serviceProvider: id });

            if (service.length > 0) return next(new ErrorHandler("Service already exists.", 401));

            service = await Service.create({ serviceType, serviceCharge, serviceDescription, serviceProvider: id });

            return res.status(201).json({
                success: true,
                status: 201,
                message: "Service created successfully",
                service
            })

        } catch (error) {
            console.log("error in create service", error.message);
        }

    }

    // delete service

    static deleteService = async (req, res, next) => {
        try {
            const { serviceId } = req.params;

            const deletedService = await Service.findByIdAndDelete(serviceId);

            if (!deletedService) {
                return next(new ErrorHandler("Service not found", 404));
            }

            return res.status(200).json({
                success: true,
                status: 200,
                message: "Service deleted successfully",
            });
        } catch (error) {
            console.log("Error in deleting service:", error.message);
            return next(new ErrorHandler("Something went wrong", 401));
        }
    };


    // get all services (experts)

    static getExpertService = async (req, res, next) => {

        try {

            const { id } = req.user;

            const services = await Service.find({ serviceProvider: id });

            if (!services || services.length === 0) return next(new ErrorHandler("You don't provide any services"));

            return res.status(200).json({
                success: true,
                status: 200,
                messages: "Services fettched",
                totalServices: services.length,
                services
            })

        } catch (error) {

            console.log("Error in getExpertService:", error.message);
            return next(new ErrorHandler("Something went wrong", 401));
        }

    }

    // update service

    static updateService = async (req, res, next) => {
        try {
            const { serviceId } = req.params;
            const { serviceType, serviceCharge, serviceDescription } = req.body;

            // Find the service by ID
            const service = await Service.findById(serviceId);

            if (!service) {
                return res.status(404).json({ error: 'Service not found' });
            }

            // Update the service fields if they are provided in the request body
            if (serviceType) {
                service.serviceType = serviceType;
            }
            if (serviceCharge) {
                service.serviceCharge = serviceCharge;
            }
            if (serviceDescription) {
                service.serviceDescription = serviceDescription;
            }

            // Save the updated service
            await service.save();

            return res.status(200).json({
                success: true,
                message: 'Service updated successfully',
                service
            });
        } catch (error) {
            console.log('Error in updating service:', error.message);
            next(error);
        }
    };
}

module.exports = ServiceController;