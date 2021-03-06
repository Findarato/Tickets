SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

--
-- Database: `tickets`
--

-- --------------------------------------------------------

--
-- Table structure for table `alt_email`
--

CREATE TABLE IF NOT EXISTS `alt_email` (
  `user_id` int(11) NOT NULL,
  `email` text NOT NULL,
  UNIQUE KEY `user_id` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `blockers`
--

CREATE TABLE IF NOT EXISTS `blockers` (
  `ticket_id` int(11) NOT NULL,
  `blocker_id` int(11) NOT NULL,
  `comment` text NOT NULL,
  KEY `ticket_id` (`ticket_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE IF NOT EXISTS `category` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `name` text NOT NULL,
  `display` tinyint(1) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=21 ;

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE IF NOT EXISTS `department` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `name` varchar(64) NOT NULL,
  PRIMARY KEY  (`id`),
  KEY `name` (`name`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

-- --------------------------------------------------------

--
-- Table structure for table `department_members`
--

CREATE TABLE IF NOT EXISTS `department_members` (
  `department_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `notify` int(11) NOT NULL,
  UNIQUE KEY `user_id` (`user_id`),
  KEY `department_id` (`department_id`,`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `equipment`
--

CREATE TABLE IF NOT EXISTS `equipment` (
  `eqipment_id` int(11) NOT NULL,
  `ticket_id` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `favorite`
--

CREATE TABLE IF NOT EXISTS `favorite` (
  `ticket_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  KEY `ticket_id` (`ticket_id`,`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `features`
--

CREATE TABLE IF NOT EXISTS `features` (
  `id` int(11) NOT NULL auto_increment,
  `name` text NOT NULL,
  `status` tinyint(1) NOT NULL,
  PRIMARY KEY  (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `status` (`status`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `lastlogon`
--

CREATE TABLE IF NOT EXISTS `lastlogon` (
  `id` int(11) NOT NULL auto_increment,
  `user_id` int(11) NOT NULL,
  `dt` int(11) NOT NULL default '0',
  PRIMARY KEY  (`id`),
  UNIQUE KEY `user_id` (`user_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=19 ;

-- --------------------------------------------------------

--
-- Table structure for table `library_names`
--

CREATE TABLE IF NOT EXISTS `library_names` (
  `ID` tinyint(4) NOT NULL auto_increment,
  `name` tinytext NOT NULL,
  `email` text NOT NULL,
  PRIMARY KEY  (`ID`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=12 ;

-- --------------------------------------------------------

--
-- Table structure for table `multi_assigned`
--

CREATE TABLE IF NOT EXISTS `multi_assigned` (
  `ticket_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  KEY `ticket_id` (`ticket_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `openId_users`
--

CREATE TABLE IF NOT EXISTS `openId_users` (
  `user_id` int(11) NOT NULL,
  `open_id` varchar(1000) NOT NULL,
  UNIQUE KEY `open_id` (`open_id`),
  UNIQUE KEY `open_id_2` (`open_id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE IF NOT EXISTS `permissions` (
  `id` int(11) NOT NULL auto_increment,
  `display` text NOT NULL,
  `permission` text NOT NULL,
  PRIMARY KEY  (`id`),
  KEY `id` (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE IF NOT EXISTS `projects` (
  `id` int(11) NOT NULL auto_increment,
  `name` text NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 COMMENT='Table to store each of the projects that could have bugs.' AUTO_INCREMENT=5 ;

-- --------------------------------------------------------

--
-- Table structure for table `recent_tickets`
--

CREATE TABLE IF NOT EXISTS `recent_tickets` (
  `user_id` int(11) NOT NULL,
  `ticket_id` int(11) NOT NULL,
  `ticket_name` text NOT NULL,
  `dt` datetime NOT NULL,
  KEY `user_id` (`user_id`),
  KEY `ticket_id` (`ticket_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `responses`
--

CREATE TABLE IF NOT EXISTS `responses` (
  `id` int(11) NOT NULL auto_increment,
  `ticket_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `parent_id` int(11) NOT NULL default '0',
  `subject` text NOT NULL,
  `body` text NOT NULL,
  `created_on` timestamp NOT NULL default CURRENT_TIMESTAMP,
  PRIMARY KEY  (`id`),
  KEY `ticket_id` (`ticket_id`,`user_id`,`created_on`),
  KEY `parent_id` (`parent_id`),
  KEY `user_id` (`user_id`),
  KEY `ticket_id_2` (`ticket_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3299 ;

-- --------------------------------------------------------

--
-- Table structure for table `status`
--

CREATE TABLE IF NOT EXISTS `status` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `status` text NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

-- --------------------------------------------------------

--
-- Stand-in structure for view `tcview`
--
CREATE TABLE IF NOT EXISTS `tcview` (
`id` int(10) unsigned
,`tickettype_id` int(11)
,`created_by_id` int(11)
,`assigned_by_id` int(11)
,`assigned_id` int(11)
,`category_id` int(11)
,`subject` text
,`description` longtext
,`status` text
,`priority` int(11)
,`created_on` datetime
,`closed_on` datetime
,`attachment` text
,`due_on` datetime
,`category` text
,`open` int(11)
,`locationId` tinyint(4)
,`locationName` tinytext
);
-- --------------------------------------------------------

--
-- Table structure for table `tickets`
--

CREATE TABLE IF NOT EXISTS `tickets` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `assigned_by_id` int(11) NOT NULL,
  `assigned_id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `created_by_id` int(11) NOT NULL,
  `tickettype_id` int(11) NOT NULL default '1',
  `subject` text NOT NULL,
  `description` longtext NOT NULL,
  `location` int(11) NOT NULL default '1',
  `status` text NOT NULL,
  `priority` int(11) NOT NULL default '0',
  `created_on` datetime NOT NULL,
  `modified_on` timestamp NOT NULL default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
  `due_on` datetime NOT NULL,
  `closed_on` datetime NOT NULL,
  `open` int(11) NOT NULL default '1',
  `attachment` text NOT NULL COMMENT 'Array of attachments',
  PRIMARY KEY  (`id`),
  KEY `assigned_by_id` (`assigned_by_id`,`assigned_id`,`category_id`,`created_by_id`),
  KEY `priority` (`priority`),
  FULLTEXT KEY `subject` (`subject`,`description`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2527 ;

-- --------------------------------------------------------

--
-- Table structure for table `tickets_hold`
--

CREATE TABLE IF NOT EXISTS `tickets_hold` (
  `ticket_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `dt` date NOT NULL,
  PRIMARY KEY  (`ticket_id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint(20) NOT NULL auto_increment,
  `previouslogin` date NOT NULL,
  `type` tinyint(4) NOT NULL default '3',
  `password` varchar(64) NOT NULL,
  `joined` date NOT NULL,
  `firstname` text NOT NULL,
  `lastname` text NOT NULL,
  `username` tinytext NOT NULL,
  `email_address` text NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2875 ;

-- --------------------------------------------------------

--
-- Table structure for table `user_permissions`
--

CREATE TABLE IF NOT EXISTS `user_permissions` (
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY  (`user_id`,`permission_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------



INSERT INTO `permissions` (`id`, `display`, `permission`) VALUES
(1, 'Administrator', 'ADMIN'),
(2, 'Staff', 'STAFF'),
(3, 'Basic User', 'USER'),
(4, 'Department Head', 'MANAGER'),
(5, 'No Access', 'NO_ACCESS'),
(6, 'View', 'VIEW'),
(7, 'Hide User', 'HIDE'),
(8, 'Default Assign', 'DEFAULT_ASSIGN');
