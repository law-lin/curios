import React, { useState } from 'react';
import {
	Stack,
	Box,
	Heading,
	Text,
	Button,
	HStack,
	VStack,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { Class } from 'types';
import './CourseSettings.css';
import Details from 'components/csettings/Details';
import { RiInformationFill } from 'react-icons/ri';
import { IconContext } from 'react-icons/lib';
import { IoExit } from 'react-icons/io5';

interface Params {
	courseId: string;
}
interface Props {
	classes: Class[];
}

function CourseSettings({ classes }: Props) {
	const { courseId } = useParams<Params>();
	const [key, setKey] = useState(0);

	const classItem = classes.find(
		(classes) => classes.id === parseInt(courseId)
	);

	const handleKey = (i) => {
		if (key !== i) {
			setKey(i);
		}
	};

	if (!classItem) {
		return <div>No such class exists!</div>;
	}

	const views = [
		{
			label: 'Class details',
			description: 'Change your class name and display image',
			icon: 'N/A',
			component: <Details classItem={classItem} />,
		},
		{
			label: 'Feature preferences',
			description: 'Customize the class features to your liking',
			icon: 'N/A',
			component: <Details classItem={classItem} />,
		},
		{
			label: 'Class Members',
			description: 'See and edit your class roster',
			icon: 'N/A',
			component: <Details classItem={classItem} />,
		},
		{
			label: 'Invite people',
			description: 'Send invites for people to join this class',
			icon: 'N/A',
			component: <Details classItem={classItem} />,
		},
		{
			label: 'Notification preferences',
			description: 'Choose what notifications you want to receive',
			icon: 'N/A',
			component: <Details classItem={classItem} />,
		},
	];

	return (
		<>
			<aside
				style={{
					display: 'flex',
					flexDirection: 'column',
					borderRight: 'rgba(120,127,133,0.12) 1px solid',
					width: '315px',
				}}
			>
				<Box p={5} borderBottom='1px solid rgba(173, 173, 173, 0.2)'>
					<Heading size='lg'>Settings</Heading>
					<Box>
						<Heading size='sm' color='gray'>
							{classItem.classNumber + ' (' + classItem.classTerm + ')'}
						</Heading>
					</Box>
				</Box>
				<Box
					p={4}
					d='flex'
					flexDirection='column'
					justifyContent='space-between'
					alignItems='center'
					height='72.5vh'
					borderBottom='1px solid rgba(173, 173, 173, 0.2)'
					overflowY='auto'
					overflowX='hidden'
				>
					<VStack spacing={3} w='315px' overflow='auto'>
						{views.map((view, i) => {
							let cclass = i === key ? 'sbutton active' : 'sbutton';
							let tclass = i === key ? 'sbutton-title active' : 'sbutton-title';
							let dclass =
								i === key
									? 'sbutton-description active'
									: 'sbutton-description';
							return (
								<Box className={cclass} onClick={() => handleKey(i)}>
									<Box d='flex' alignItems='center' className={tclass}>
										<IconContext.Provider value={{}}>
											<RiInformationFill style={{ marginRight: '5px' }} />
										</IconContext.Provider>
										{view.label}
									</Box>
									<Box className={dclass}>{view.description}</Box>
								</Box>
							);
						})}
					</VStack>
					<Box className={'leavebutton'}>
						<IoExit style={{ marginRight: '5px' }} />
						<Box>Leave class</Box>
					</Box>
				</Box>
			</aside>
			<Box flex={1}>{views[key].component}</Box>
		</>
	);
}

export default CourseSettings;
