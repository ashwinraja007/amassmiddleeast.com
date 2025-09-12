
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Clock, Briefcase, Users, Award, TrendingUp } from 'lucide-react';

const Career = () => {
  const jobOpenings = [
    
  ];

  const benefits = [
    {
      icon: <Users className="w-8 h-8 text-gc-gold" />,
      title: "Great Team Culture",
      description: "Work with passionate professionals in a collaborative environment"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-gc-gold" />,
      title: "Career Growth",
      description: "Opportunities for professional development and career advancement"
    },
    {
      icon: <Award className="w-8 h-8 text-gc-gold" />,
      title: "Competitive Benefits",
      description: "Comprehensive health coverage, performance bonuses, and more"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-32">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Join Our Global Team</h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Build your career with a leading logistics company that operates across Asia Pacific. 
              We're always looking for talented individuals to join our growing family.
            </p>
            <Button className="bg-gc-gold hover:bg-gc-bronze text-white px-8 py-3 text-lg">
              View Open Positions
            </Button>
          </div>
        </section>

        {/* Why Work With Us */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Work With Us</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Join a company that values innovation, growth, and employee well-being
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="text-center p-6">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      {benefit.icon}
                    </div>
                    <CardTitle className="text-xl">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Current Openings */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Current Openings</h2>
              <p className="text-lg text-gray-600">
                Explore exciting career opportunities across our global operations
              </p>
            </div>

            <div className="grid gap-6 max-w-4xl mx-auto">
              {jobOpenings.map((job, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                      <p className="text-gray-600 mb-4">{job.description}</p>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {job.type}
                        </div>
                        <div className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {job.department}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 md:mt-0 md:ml-6">
                      <Button className="bg-gc-gold hover:bg-gc-bronze text-white px-6">
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-lg mb-6">Don't see the right position? We'd still love to hear from you!</p>
              <Button variant="outline" className="border-gc-gold text-gc-gold hover:bg-gc-gold hover:text-white px-8 py-3">
                Send Your Resume
              </Button>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-gray-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join our team and be part of a company that's shaping the future of logistics in Asia Pacific.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gc-gold hover:bg-gc-bronze text-white px-8 py-3">
                Contact HR Team
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3">
                Learn More About Us
              </Button>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Career;
