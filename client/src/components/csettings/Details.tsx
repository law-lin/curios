import { Box, Heading, Input } from '@chakra-ui/react';
import { Class } from 'types';
import '../../views/CourseSettings.css';

interface Props {
	classes: Class;
}
const Details = ({ classes }: Props) => {
	return (
		<Box padding='50px'>
			<Box marginBottom='15px'>
				<Heading size='md'>
					{classes.classNumber + ': ' + classes.className}
				</Heading>
				<Box>
					<Heading size='xs' color='gray' marginTop='1'>
						{classes.classTerm}
					</Heading>
				</Box>
			</Box>

			<Box
				d='flex'
				flexDirection='column'
				fontFamily='Roboto, sans-serif'
				width='500px'
			>
				<Box
					d='flex'
					justifyContent='space-between'
					borderBottom='1px solid rgba(173, 173, 173, 0.2)'
				>
					<Box
						d='flex'
						justifyContent='center'
						alignItems='center'
						h='144px'
						w='144px'
					>
						Image
					</Box>
					<Box paddingBottom='40px' paddingRight='75px'>
						<Box marginBottom='16px' width='240px'>
							<Box
								fontSize='12px'
								fontWeight='600'
								lineHeight='18px'
								marginBottom='5px'
							>
								Class name
							</Box>
							<Input
								height='32px'
								variant='filled'
								placeholder='e.g. Intro to Programming'
								value={classes.className}
								fontSize='12px'
								width='100%'
							></Input>
						</Box>
						<Box marginBottom='16px'>
							<Box
								fontSize='12px'
								fontWeight='600'
								lineHeight='18px'
								marginBottom='5px'
							>
								Class number
							</Box>
							<Input
								height='32px'
								variant='filled'
								placeholder='e.g. CS 110'
								value={classes.classNumber}
								fontSize='12px'
							></Input>
						</Box>
						<Box
							d='flex'
							justifyContent='center'
							alignItems='center'
							borderRadius='34px'
							height='32px'
							width='130px'
							backgroundColor='#0084ff'
							fontSize='12px'
							fontWeight='600'
							color='white'
							_hover={{
								filter: 'brightness(95%)',
								cursor: 'pointer',
							}}
						>
							Save Changes
						</Box>
					</Box>
				</Box>
				<Box
					paddingTop='40px'
					paddingBottom='40px'
					borderBottom='1px solid rgba(173, 173, 173, 0.2)'
				>
					<Heading size='sm' marginBottom='10px'>
						Archive class
					</Heading>
					<Box
						fontSize='12px'
						lineHeight='18px'
						color='#787F85'
						marginBottom='20px'
					>
						Archiving this class will prevent it from showing up in the left
						sidebar for all class members, but leave the class accessible from
						the class archives, under the main menu.{' '}
					</Box>
					<Box
						/*className='roundborderbutton'*/ d='flex'
						justifyContent='center'
						alignItems='center'
						borderRadius='34px'
						height='32px'
						width='130px'
						fontSize='12px'
						fontWeight='600'
						border='1px solid #e0e0e0'
						_hover={{
							filter: 'brightness(95%)',
							cursor: 'pointer',
							backgroundColor: '#f3f4f6',
						}}
					>
						Archive
					</Box>
				</Box>
				<Box paddingTop='40px' paddingBottom='40px'>
					<Heading size='sm' marginBottom='10px'>
						Delete class
					</Heading>
					<Box
						fontSize='12px'
						lineHeight='18px'
						color='#787F85'
						marginBottom='20px'
					>
						We will permanently delete your class and all data included.
					</Box>
					<Box
						/*className='roundborderbutton'*/ d='flex'
						justifyContent='center'
						alignItems='center'
						borderRadius='34px'
						height='32px'
						width='130px'
						fontSize='12px'
						fontWeight='600'
						border='1px solid #FC144B'
						color='#FC144B'
						_hover={{
							filter: 'brightness(95%)',
							cursor: 'pointer',
							backgroundColor: '#FC144B',
							color: 'white',
						}}
					>
						Delete
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default Details;
