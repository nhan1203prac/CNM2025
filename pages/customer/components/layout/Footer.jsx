
import React from 'react';
import { untils } from '../../../../languages/untils';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-40">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-[#181411]">
              <div className="size-6 text-primary">
                <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path clip-rule="evenodd" d="M24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4ZM24 10C26.2091 10 28 11.7909 28 14V17H31C32.6569 17 34 18.3431 34 20V34C34 35.6569 32.6569 37 31 37H17C15.3431 37 14 35.6569 14 34V20C14 18.3431 15.3431 17 17 17H20V14C20 11.7909 21.7909 10 24 10ZM24 29C25.6569 29 27 27.6569 27 26C27 24.3431 25.6569 23 24 23C22.3431 23 21 24.3431 21 26C21 27.6569 22.3431 29 24 29Z" fill="currentColor" fill-rule="evenodd"></path>
                </svg>
              </div>
              <h2 className="text-lg font-bold">{untils.mess("header.app_name")}</h2>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">{untils.mess("footer.description")}</p>
          </div>
          <div>
            <h3 className="font-bold text-[#181411] mb-4">{untils.mess("footer.about.title")}</h3>
            <ul className="flex flex-col gap-2 text-sm text-gray-500">
              <li><a className="hover:text-primary transition-colors" href="#">{untils.mess("footer.about.intro")}</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">{untils.mess("footer.about.careers")}</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">{untils.mess("footer.about.terms")}</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">{untils.mess("footer.about.privacy")}</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-[#181411] mb-4">{untils.mess("footer.support.title")}</h3>
            <ul className="flex flex-col gap-2 text-sm text-gray-500">
              <li><a className="hover:text-primary transition-colors" href="#">{untils.mess("footer.support.help_center")}</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">{untils.mess("footer.support.guide")}</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">{untils.mess("footer.support.return_policy")}</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">{untils.mess("footer.support.contact")}</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-[#181411] mb-4">{untils.mess("footer.newsletter.title")}</h3>
            <div className="flex gap-2">
              <input className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" placeholder={untils.mess("footer.newsletter.placeholder")} type="email"/>
              <button className="bg-primary text-white rounded-lg px-4 hover:bg-primary/90 transition-colors">
                <span className="material-symbols-outlined text-sm">send</span>
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
          <p>{untils.mess("footer.copyright")}</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span className="cursor-pointer hover:text-gray-600 transition-colors">Facebook</span>
            <span className="cursor-pointer hover:text-gray-600 transition-colors">Instagram</span>
            <span className="cursor-pointer hover:text-gray-600 transition-colors">Twitter</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
