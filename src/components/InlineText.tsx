/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import './InlineText.css';

import HelpIcon from '../assets/svg/HelpIcon.svg';
import LoadingSpinner from '../assets/svg/Loading Spinner.svg';
import AnnotationHeart from '../assets/svg/annotation-heart.svg';
import Briefcase from '../assets/svg/briefcase-02.svg';
import ChevronDown from '../assets/svg/chevron-down.svg';
import FileIcon from '../assets/svg/file-02.svg';
import HeadingSquare from '../assets/svg/heading-square.svg';
import InfoCircle from '../assets/svg/info-circle.svg';
import Lightbulb from '../assets/svg/lightbulb-02.svg';
import List1Icon from '../assets/svg/list-1.svg';
import ListIcon from '../assets/svg/list.svg';
import ComposeLogo from '../assets/svg/logo_compose.png';
import Mail from '../assets/svg/mail-02.svg';
import Menu from '../assets/svg/menu-05.svg';
import MultiParagraphSquare from '../assets/svg/multi-paragraph-square.svg';
import ParagraphSquare from '../assets/svg/paragraph-square.svg';
import ZapFast from '../assets/svg/zap-fast.svg';

interface ListOption {
  text: string;
  iconUri: string;
}

/**
 * Hardcoded list of menu items and their icons from the design
 */
const listOptions: ListOption[] = [
  ['outline for a', ListIcon],
  ['bullet list of', List1Icon],
  ['headline for a', HeadingSquare],
  ['paragraph about', ParagraphSquare],
  ['couple paragraphs about', MultiParagraphSquare],
  ['sentence about', Menu],
  ['few ideas for', Lightbulb],
  ['bit of information about', InfoCircle],
  ['email to', Mail],
].map((lo) => ({ text: lo[0], iconUri: lo[1] }));

export interface InlineTextProps {
  /**
   * DOM Id of the element
   */
  id?: string;
}

export const InlineText: React.FC<InlineTextProps> = ({ id }) => {
  const [prefix, setPrefix] = useState('Write a ');
  const [inputValue, setInputValue] = useState(prefix);
  const [filteredOptions, setFilteredOptions] = useState(listOptions);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [showProTip, setShowProTip] = useState(false);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value.startsWith(prefix)) {
      setInputValue(prefix); // reset the input value if the user tries to delete the prefix
    } else {
      setInputValue(value);
    }
    if (isTooltipVisible) {
      setIsTooltipVisible(false);
    }
  };

  const decideArticle = (word: string): string => {
    const wordLower = word.toLowerCase();
    const specialCases = ['hour', 'umbrella', 'university', 'utensil', 'user']; // Add more special cases as needed

    if (specialCases.includes(wordLower)) {
      return wordLower === 'hour' ? 'an' : 'a';
    }

    const vowels = ['a', 'e', 'i', 'o', 'u']; // List of vowels
    return vowels.includes(word[0].toLowerCase()) ? 'an' : 'a';
  };

  useEffect(() => {
    const userText = inputValue.substring(prefix.length).trim(); // Extracting the user input, ignoring the prefix.

    // If there's no userText, reset the prefix to the default.
    if (!userText) {
      setPrefix(`Write a `);
      return;
    }

    // Decide the article for the prefix based on user input.
    const nextWord = userText.split(' ')[0]; // Extract the first word after the prefix.
    const article = decideArticle(nextWord); // Decide the article based on the first word.

    // Only update the prefix if the article has changed.
    if (!prefix.includes(article)) {
      setInputValue(inputValue.replace(prefix, `Write ${article} `));
      setPrefix(`Write ${article} `);
    }

    // Manage the filter functionality.
    if (userText.includes('//')) {
      setFilteredOptions(listOptions); // If userText has //, then show all listOptions.
    } else {
      setFilteredOptions(listOptions.filter((option) => option.text.includes(userText)));
    }

    // Additional logic to manage whether to show the ProTip and Advanced Options sections.
    setShowProTip(filteredOptions.length === 1);
    setShowAdvancedOptions(filteredOptions.length > 0 || showProTip);
  }, [inputValue, prefix, filteredOptions, showProTip]);
  return (
    <div id={id} className="inlineText-container">
      <div className="inlineText-input-container">
        <input className="inlineText-input" type="text" value={inputValue} onChange={handleInputChange} />
        <div
          className="input-icon-right"
          onMouseEnter={() => {
            console.log('Mouse over HelpIcon');
            setIsTooltipVisible(true);
          }}
          onMouseOut={() => {
            console.log('Mouse out HelpIcon');
            setIsTooltipVisible(false);
          }}
        >
          <img src={HelpIcon} alt="Help Icon" />
        </div>
      </div>
      {isTooltipVisible && (
        <div className="tooltip-container">
          <div className="tooltip-arrow"></div>
          <div className="tooltip">
            Have fun and experiment. Our AI can write almost anything! But, make sure to be specific in your
            prompt to the AI. The more detail you give, the better the results will be!
          </div>
        </div>
      )}
      {inputValue.length > prefix.length && (
        <div>
          <div className="list-container">
            <div className="stationary-item">
              <div>Type anything or ...</div>
            </div>
            <ul className="list">
              {filteredOptions.map((option) => (
                <li key={option.text} className="list-item">
                  <img src={option.iconUri} alt={option.text} className="list-item-icon" />
                  <span>{option.text}</span>
                </li>
              ))}
            </ul>

            {showProTip && (<>
              <div className="separator-line"></div>
              <div className="proTip-container">

                <div className="proTip-bubble">Pro Tip</div>
                <p className="proTip-text">
                  Make sure to be specific in your prompt. The more detail you give, the better the results
                  will be!
                </p>
                <div className="enter-instruction">
                  <span>Hit </span>
                  <span className="enter-button">enter</span>
                  <span> to submit your prompt</span>
                </div>
              </div>
              </>
            )}
          </div>
          {showProTip || filteredOptions.length > 0 ? (
            <div className="advanced-options">
              <div className="separator-line"></div>
              <img src={ZapFast} alt="Advanced Options" className="list-item-icon" />
              <span>Advanced Options</span>
              <img className='chevron-down' src={ChevronDown} alt="Expand" />
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};
