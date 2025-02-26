import React from 'react';
import { Link } from 'react-router-dom';

const Updates = () => {
  return (
    <>
      {/* News & Updates Section */}
      
      <section className="news-updates dark:bg-slate-800">
        <h2 className='text-center pb-[20px] text-3xl font-bold text-black dark:text-white'>News <span className='text-pink-500'>&</span> Updates<span className='text-pink-500'>...</span></h2>
        <div className="news-grid text-black dark:text-black">
          <div className="news-item">
            <h3>Latest Announcements</h3>
            <p>Recent developments in Gujarat’s innovation and startup ecosystem.</p>
          </div>
          <div className="news-item">
            <h3>Upcoming Events</h3>
            <p>
              Join seminars and workshops on research and innovation.{' '}
              <br />
              <Link to="/events"><span className='text-pink-500 font-semibold hover:text-pink-400'>See Events</span></Link>
            </p>
          </div>
          <div className="news-item">
            <h3>Articles & Insights</h3>
            <p>
              Explore case studies and insights from industry experts.{' '}
              <br />
              <Link to="/readmore"><span className='text-pink-500 font-semibold hover:text-pink-400'>Read More</span></Link>
            </p>
          </div>
        </div>
      </section>


    </>
  );
};

export default Updates;

