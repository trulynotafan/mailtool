class TemplateService {
    constructor() {
        this.templates = {
            restaurant: `
Dear {businessName} team,

I understand managing a restaurant's online presence while handling day-to-day operations can be overwhelming. I noticed your restaurant could benefit from a modern website that truly showcases your culinary offerings.

At ForgeWeb.uk, we specialize in restaurant websites that help:
• Display your menu with beautiful food photography
• Manage online reservations and reduce no-shows
• Handle takeaway orders efficiently
• Showcase daily specials and seasonal menu changes
• Integrate with platforms like Deliveroo and UberEats

Having worked with several restaurants, I know the challenges of managing staff schedules, inventory, and customer service. A well-designed website can help streamline these operations.

Let's discuss how we can make your restaurant stand out online.

Best regards,
Afaan
ForgeWeb.uk
Email: contactforgeweb@gmail.com
Website: forgeweb.uk`,

            cafe: `
Dear {businessName} team,

Running a café requires juggling multiple tasks - from managing morning rushes to keeping your menu fresh and exciting. I noticed your café and believe we could help enhance your digital presence to match the quality of your offerings.

Our café-specific websites include:
• Real-time updates for daily specials and pastries
• Mobile ordering to reduce queue times
• Loyalty program integration
• Instagram feed to showcase your coffee art and treats
• Event calendar for special occasions and tastings

We understand the coffee business and how important it is to maintain the cozy atmosphere while increasing efficiency.

Let's discuss how we can help your café thrive online.

Best regards,
Afaan
ForgeWeb.uk
Email: contactforgeweb@gmail.com
Website: forgeweb.uk`,

            hairdresser: `
Dear {businessName} team,

In the competitive world of hair styling, I understand how crucial it is to showcase your work and keep your appointment book full. Your salon deserves a website that's as stylish as the services you provide.

Our salon-specific features include:
• Online booking system that syncs with your schedule
• Before/after gallery to showcase your transformations
• Style lookbook for client inspiration
• Product showcase for retail items
• Staff profiles to highlight your talented team
• Instagram feed integration for your latest work

We've helped many salons reduce no-shows and attract new clients through effective online presence.

Let's discuss how we can help your salon shine online.

Best regards,
Afaan
ForgeWeb.uk
Email: contactforgeweb@gmail.com
Website: forgeweb.uk`,

            plumber: `
Dear {businessName} team,

I know emergency calls and scheduled maintenance keep you busy around the clock. Your plumbing business needs a website that works as hard as you do to attract and manage clients.

Our plumber-specific websites include:
• 24/7 emergency booking system
• Service area map integration
• Instant quote calculators
• Emergency tips section for clients
• Photo gallery of completed projects
• Customer testimonials with job details

We understand the plumbing industry and how important it is to be easily reachable during emergencies.

Let's discuss how we can help your plumbing business grow online.

Best regards,
Afaan
ForgeWeb.uk
Email: contactforgeweb@gmail.com
Website: forgeweb.uk`,

            electrician: `
Dear {businessName} team,

In the electrical trade, safety and reliability are paramount. Your website should reflect these values while helping you manage and grow your client base.

Our electrician-specific websites feature:
• Emergency call-out forms
• Electrical safety tips section
• Certification and insurance displays
• Project showcase with before/after photos
• Service area mapping
• Online quote system for planned work

Having worked with several electrical contractors, we understand the importance of being accessible for both emergencies and planned work.

Let's discuss how we can power up your online presence.

Best regards,
Afaan
ForgeWeb.uk
Email: contactforgeweb@gmail.com
Website: forgeweb.uk`,

            builder: `
Dear {businessName} team,

Construction is about turning plans into reality, and your website should showcase your craftsmanship while helping manage project inquiries effectively.

Our builder-specific websites include:
• Project portfolio with detailed case studies
• Virtual consultation booking
• Planning permission information
• Material supplier partnerships
• Time-lapse project galleries
• Quote request system with project specifications

We understand the construction industry's unique challenges and how to present your work professionally online.

Let's discuss how we can build your digital presence.

Best regards,
Afaan
ForgeWeb.uk
Email: contactforgeweb@gmail.com
Website: forgeweb.uk`,

            supermarket: `
Dear {businessName} team,

In today's competitive grocery market, having a strong online presence is crucial. Your supermarket needs a website that helps customers find what they need efficiently.

Our supermarket-specific features include:
• Real-time stock updates
• Weekly special offers section
• Digital loyalty card integration
• Click & collect system
• Department-specific shopping lists
• Local delivery scheduling

We understand grocery retail and how to make online shopping convenient for your customers.

Let's discuss how we can enhance your supermarket's digital presence.

Best regards,
Afaan
ForgeWeb.uk
Email: contactforgeweb@gmail.com
Website: forgeweb.uk`,

            bakery: `
Dear {businessName} team,

The aroma of fresh bread and pastries might bring customers to your shop, but a great website can help them plan their visits and place orders in advance.

Our bakery-specific websites include:
• Daily specials and fresh batch notifications
• Pre-order system for special occasions
• Custom cake design forms
• Seasonal product showcase
• Wholesale client portal
• Baking class bookings

We understand the early mornings and precise timing needed in bakeries, and how to make ordering easier for your customers.

Let's discuss how we can help your bakery rise online.

Best regards,
Afaan
ForgeWeb.uk
Email: contactforgeweb@gmail.com
Website: forgeweb.uk`,

            // Universal template for any other business type
            universal: `
Dear {businessName} team,

I noticed your business and wanted to reach out about enhancing your online presence. In today's digital world, having a professional website is crucial for business growth.

At ForgeWeb.uk, we create custom websites that:
• Attract more customers
• Streamline your operations
• Build credibility
• Showcase your services
• Improve customer engagement

Let's discuss how we can help your business thrive online.

Best regards,
Afaan
ForgeWeb.uk
Email: contactforgeweb@gmail.com
Website: forgeweb.uk`
        };

        // Add aliases for similar business types
        this.typeAliases = {
            'restaurant': ['restaurants', 'dining', 'eatery', 'food'],
            'cafe': ['coffee', 'cafeteria', 'coffee_shop', 'cafe_bar', 'coffeeshop'],
            'hairdresser': ['salon', 'barber', 'hair_salon', 'beauty_salon', 'hair'],
            'plumber': ['plumbing', 'plumbing_service', 'drainage'],
            'electrician': ['electrical', 'electrical_service', 'electrical_contractor'],
            'builder': ['construction', 'building', 'contractor', 'home_builder'],
            'supermarket': ['grocery', 'grocers', 'food_store'],
            'bakery': ['baker', 'patisserie', 'bread', 'cake_shop']
        };
    }

    getTemplate(businessName, businessType) {
        const normalizedType = businessType.toLowerCase().replace(/[^a-z0-9]/g, '');
        
        let templateKey = 'universal';
        
        if (this.templates[normalizedType]) {
            templateKey = normalizedType;
        } else {
            for (const [key, aliases] of Object.entries(this.typeAliases)) {
                if (aliases.includes(normalizedType)) {
                    templateKey = key;
                    break;
                }
            }
        }

        return this.templates[templateKey].replace('{businessName}', businessName);
    }
}

module.exports = TemplateService; 