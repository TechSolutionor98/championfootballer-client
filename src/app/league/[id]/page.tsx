'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
    Box,
    Typography,
    Paper,
    Button,
    Card,
    CardContent,
    Grid,
    Chip,
    Divider,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Snackbar,
    IconButton,
    Select,
    MenuItem,
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
    Switch,
    TextField,
    Alert,
} from '@mui/material';
import { useAuth } from '@/lib/hooks';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Users, Trophy, Calendar, Copy, Edit, Settings, Table2Icon } from 'lucide-react';
import Link from 'next/link';
import leagueIcon from '@/Components/images/league.png';
import Image from 'next/image';
import toast from 'react-hot-toast';
import TrophyRoom from '@/Components/TrophyRoom';
import FirstBadge from '@/Components/images/1st.png';
import SecondBadge from '@/Components/images/2nd.png';
import ThirdBadge from '@/Components/images/3rd.png';
import PlayerCard from '@/Components/league player card/leaguememberplayercard';
import Group from '@/Components/images/group451.png'


interface League {
    id: string;
    name: string;
    inviteCode: string;
    createdAt: string;
    members: User[];
    administrators: User[];
    matches: Match[];
    active: boolean;
    maxGames: number;
    showPoints: boolean;
}

interface User {
    shirtNumber: undefined;
    positionType: undefined;
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    profilePicture?: string | null;
}

interface Match {
    id: string;
    date: string;
    location: string;
    status: string;
    homeTeamName: string;
    awayTeamName: string;
    homeTeamGoals?: number;
    awayTeamGoals?: number;
    availableUsers: User[];
    homeTeamUsers: User[];
    awayTeamUsers: User[];
    end: string;
    active: boolean;
}

interface LeagueSettingsDialogProps {
    open: boolean;
    onClose: () => void;
    league: League | null;
    onUpdate: (data: Partial<League & { admins: string[] }>) => void;
    onDelete: () => void;
}

function LeagueSettingsDialog({ open, onClose, league, onUpdate, onDelete }: LeagueSettingsDialogProps) {
    const [name, setName] = useState('');
    const [adminId, setAdminId] = useState('');
    const [isActive, setIsActive] = useState(true);
    const [maxGames, setMaxGames] = useState(20);
    const [showPoints, setShowPoints] = useState(true);

    useEffect(() => {
        if (league) {
            setName(league.name || '');
            setIsActive(league.active !== false);
            setMaxGames(league.maxGames || 20);
            setShowPoints(league.showPoints !== false);
            setAdminId(league.administrators?.[0]?.id || '');
        }
    }, [league]);

    const handleUpdate = () => {
        const updatedData = {
            name,
            active: isActive,
            maxGames,
            showPoints,
            admins: [adminId]
        };
        onUpdate(updatedData);
    };

    if (!league) return null;

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle sx={{ fontWeight: 'bold' }}>Manage League Settings</DialogTitle>
            <DialogContent>
                <Box component="form" noValidate autoComplete="off" sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>

                    <FormControl fullWidth>
                        <Typography variant="subtitle1" fontWeight="medium" gutterBottom>Select league admin</Typography>
                        <Select
                            value={adminId}
                            onChange={(e) => setAdminId(e.target.value)}
                        >
                            {league.members.map((member: User) => (
                                <MenuItem key={member.id} value={member.id}>
                                    {member.firstName} {member.lastName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <Typography variant="subtitle1" fontWeight="medium" gutterBottom>League name</Typography>
                        <TextField
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </FormControl>

                    <FormControl component="fieldset">
                        <Typography variant="subtitle1" fontWeight="medium" gutterBottom>Change league active status</Typography>
                        <RadioGroup
                            row
                            value={isActive ? 'active' : 'inactive'}
                            onChange={(e) => setIsActive(e.target.value === 'active')}
                        >
                            <FormControlLabel value="active" control={<Radio />} label="Active" />
                            <FormControlLabel value="inactive" control={<Radio />} label="Inactive" />
                        </RadioGroup>
                    </FormControl>

                    <FormControl fullWidth>
                        <Typography variant="subtitle1" fontWeight="medium" gutterBottom>Maximum number of matches</Typography>
                        <TextField
                            fullWidth
                            type="number"
                            value={maxGames}
                            onChange={(e) => setMaxGames(Number(e.target.value))}
                        />
                    </FormControl>

                    <FormControlLabel
                        control={<Switch checked={showPoints} onChange={(e) => setShowPoints(e.target.checked)} />}
                        label="Show points in league table?"
                    />
                </Box>
            </DialogContent>
            <DialogActions sx={{ p: 3, justifyContent: 'space-between' }}>
                <Button onClick={handleUpdate} variant="contained" sx={{ bgcolor: '#27ab83', '&:hover': { bgcolor: '#1e8463' } }}>Update League</Button>
                <Button onClick={onDelete} variant="contained" color="error">Delete League</Button>
            </DialogActions>
        </Dialog>
    );
}

// Add TableData type
interface TableData {
    id: string;
    name: string;
    played: number;
    wins: number;
    draws: number;
    losses: number;
    winPercentage: string;
    isAdmin?: boolean;
    profilePicture?: string | null;
}

export default function LeagueDetailPage() {
    const [league, setLeague] = useState<League | null>(null);
    console.log('leagues matches', league?.matches)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { user, token } = useAuth();
    const params = useParams();
    const router = useRouter();
    const leagueId = params?.id ? String(params.id) : '';
    const [teamModalOpen, setTeamModalOpen] = useState(false);
    const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
    const [availabilityLoading, setAvailabilityLoading] = useState<{ [matchId: string]: boolean }>({});
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [section, setSection] = useState<'members' | 'matches' | 'table' | 'awards'>('members');
    const searchParams = useSearchParams();
    const profilePlayerId = typeof searchParams?.get === 'function' ? searchParams.get('profilePlayerId') : '';
    const [hasCommonLeague, setHasCommonLeague] = useState(false);
    const [checkedCommonLeague, setCheckedCommonLeague] = useState(false);

    // Declare isMember and isAdmin here so they are available for useEffect and logic below
    const isMember = league && league.members && user && league.members.some((m: User) => m.id === user.id);
    const isAdmin = league && league.administrators && user && league.administrators.some((a: User) => a.id === user.id);

    // const handleOpenTeamModal = (match: Match) => {
    //     setSelectedMatch(match);
    //     setTeamModalOpen(true);
    // };

    const handleCloseTeamModal = () => {
        setTeamModalOpen(false);
        setSelectedMatch(null);
    };

    console.log('league', league)

    const fetchLeagueDetails = useCallback(async () => {
        try {
            setLoading(true);
            console.log("Token before fetch:", token); // Debug log
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leagues/${leagueId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();
            if (data.success) {
                console.log('Server Response - League Data:', data.league);
                console.log('Server Response - Matches:', data.league.matches);
                if (data.league.matches) {
                    data.league.matches.forEach((match: Match, index: number) => {
                        console.log(`Match ${index + 1} End Time:`, match.end);
                    });
                }
                setLeague(data.league);
            } else {
                setError(data.message || 'Failed to fetch league details');
            }
        } catch (error) {
            console.error('Error fetching league details:', error);
            setError('Failed to fetch league details');
        } finally {
            setLoading(false);
        }
    }, [leagueId, token]);
    useEffect(() => {
        if (!leagueId && !token) return;
        fetchLeagueDetails();
    }, [leagueId, token, fetchLeagueDetails]);

    // Professional access logic: allow if user and profile player have ever shared ANY league
    useEffect(() => {
        if (!user || !profilePlayerId) {
            setCheckedCommonLeague(true);
            setHasCommonLeague(false);
            return;
        }
        Promise.all([
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
                headers: { Authorization: `Bearer ${token}` }
            }).then(res => res.json()),
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/players/${profilePlayerId}/stats`, {
                headers: { Authorization: `Bearer ${token}` }
            }).then(res => res.json())
        ]).then(([userData, playerData]) => {
            const userLeagues = [
                ...(userData.user.leagues || []),
                ...(userData.user.administeredLeagues || [])
            ].map(l => l.id);
            const profilePlayerLeagues = (playerData.data?.leagues || []).map((l: User) => l.id);
            const hasOverlap = userLeagues.some((id: string) => profilePlayerLeagues.includes(id));
            setHasCommonLeague(hasOverlap);
            setCheckedCommonLeague(true);
        }).catch(() => {
            setHasCommonLeague(false);
            setCheckedCommonLeague(true);
        });
    }, [user, profilePlayerId, token]);


    const handleBackToAllLeagues = () => {
        router.push('/all-leagues');
    };

    const handleToggleAvailability = async (matchId: string, isAvailable: boolean) => {
        if (!user) {
            setError('Please login to mark availability');
            return;
        }

        setAvailabilityLoading(prev => ({ ...prev, [matchId]: true }));
        const action = isAvailable ? 'unavailable' : 'available';

        try {
            console.log('Sending request with action:', action);
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const response = await fetch(`${apiUrl}/matches/${matchId}/availability?action=${action}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Server responded with ${response.status}: ${await response.text()}`);
            }

            const data = await response.json();
            console.log('Response from server:', data);

            if (data.success && data.match) {
                setLeague(prevLeague => {
                    if (!prevLeague) return prevLeague;
                    const updatedMatches = prevLeague.matches.map(m =>
                        m.id === matchId ? { ...m, availableUsers: data.match.availableUsers } : m
                    );
                    return { ...prevLeague, matches: updatedMatches };
                });
                setToastMessage(action === 'available' ? 'You are now available for this match.' : 'You are now unavailable for this match.');
            } else if (data.success) {
                fetchLeagueDetails();
                setToastMessage(action === 'available' ? 'You are now available for this match.' : 'You are now unavailable for this match.');
            } else {
                throw new Error(data.message || 'Failed to update availability');
            }
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
            console.error('Error updating availability:', err);
            setError(errorMessage || 'Failed to connect to server');
        } finally {
            setAvailabilityLoading(prev => ({ ...prev, [matchId]: false }));
        }
    };

    const handleUpdateLeague = async (updatedData: Partial<League & { admins: string[] }>) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leagues/${leagueId}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData)
            });
            const data = await response.json();
            if (data.success) {
                toast.success('League updated successfully!');
                fetchLeagueDetails();
                setIsSettingsOpen(false);
            } else {
                toast.error(data.message || 'Failed to update league');
            }
        } catch (error) {
            console.error('Error updating league:', error);
            toast.error('An error occurred while updating the league.');
        }
    };

    const handleDeleteLeague = async () => {
        if (window.confirm('Are you sure you want to delete this league? This action cannot be undone.')) {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leagues/${leagueId}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (response.ok) {
                    toast.success('League deleted successfully.');
                    router.push('/all-leagues');
                } else {
                    const data = await response.json();
                    toast.error(data.message || 'Failed to delete league.');
                }
            } catch (error) {
                console.error('Error deleting league:', error);
                toast.error('An error occurred while deleting the league.');
            }
        }
    };

    // Calculate dynamic table data
    const tableData: TableData[] = React.useMemo(() => {
        if (!league) return [];
        const playerStats = new Map<string, TableData>();
        const adminId = league.administrators?.[0]?.id; // Assuming the first admin is the league admin
        league.members.forEach((member) => {
            playerStats.set(member.id, {
                id: member.id,
                name: `${member.firstName} ${member.lastName}`,
                played: 0,
                wins: 0,
                draws: 0,
                losses: 0,
                winPercentage: '0%',
                isAdmin: member.id === adminId,
                profilePicture: member.profilePicture || null,
            });
        });
        league.matches
            .filter((match) => match.status === 'completed' && match.homeTeamGoals != null && match.awayTeamGoals != null)
            .forEach((match) => {
                const homeWon = match.homeTeamGoals! > match.awayTeamGoals!;
                const awayWon = match.awayTeamGoals! > match.homeTeamGoals!;
                const isDraw = match.homeTeamGoals === match.awayTeamGoals;
                const processPlayer = (player: User, isHome: boolean) => {
                    if (playerStats.has(player.id)) {
                        const stats = playerStats.get(player.id)!;
                        stats.played++;
                        if ((isHome && homeWon) || (!isHome && awayWon)) {
                            stats.wins++;
                        } else if (isDraw) {
                            stats.draws++;
                        } else {
                            stats.losses++;
                        }
                    }
                };
                match.homeTeamUsers.forEach((player) => processPlayer(player, true));
                match.awayTeamUsers.forEach((player) => processPlayer(player, false));
            });
        const arr = Array.from(playerStats.values()).map((stats) => ({
            ...stats,
            winPercentage: stats.played > 0 ? `${Math.round((stats.wins / stats.played) * 100)}%` : '0%',
        }));
        arr.sort((a, b) => b.wins - a.wins || b.draws - a.draws || a.losses - b.losses);
        return arr;
    }, [league]);

    const getAvailabilityCounts = (match: Match) => {
        // Find the league for this match
        const leagueForMatch = league; // Assuming 'league' is available in this scope
        const leagueMembers = leagueForMatch?.members || [];
        // Count how many league members are in availableUsers
        const availableCount = leagueMembers.filter(member =>
            match.availableUsers?.some((u: User) => u.id === member.id)
        ).length;
        const pendingCount = leagueMembers.length - availableCount;
        return { availableCount, pendingCount };
    };


    if (loading || !checkedCommonLeague) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
            }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error || !league) {
        return (
            <Box sx={{
                p: 4,
                minHeight: '100vh',
                color: 'black'
            }}>
                <Button
                    startIcon={<ArrowLeft />}
                    onClick={handleBackToAllLeagues}
                    sx={{ mb: 2, color: 'black' }}
                >
                    Back to All Leagues
                </Button>
                <Typography variant="h6" color="error">
                    {error || 'League not found'}
                </Typography>
            </Box>
        );
    }

    // Access control for non-members
    if (!isMember && !hasCommonLeague) {
        return (
            <Box sx={{ p: 4, minHeight: '100vh' }}>
                <Typography color="error" variant="h6">
                    You don&apos;t have access to this league.
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 4, minHeight: '100vh' }}>
            {!league.active && (
                <Alert severity="warning" sx={{ mb: 2 }}>
                    This league is currently inactive. All actions are disabled until an admin reactivates it.
                </Alert>
            )}
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Button
                    startIcon={<ArrowLeft />}
                    onClick={handleBackToAllLeagues}
                    sx={{
                        mb: 2, color: 'white', backgroundColor: '#1f673b',
                        '&:hover': { backgroundColor: '#388e3c' },
                    }}
                >
                    Back to All Leagues
                </Button>
                <Paper sx={{ p: 3, backgroundColor: '#1f673b', color: 'white' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Trophy size={32} />
                            <Typography textTransform="uppercase" variant="h4" component="h1">
                                {league.name}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {isMember && (
                          <>
                            <Chip
                                label={`Invite Code: ${league.inviteCode}`}
                                sx={{
                                    backgroundColor: '#43a047',
                                    '&:hover': { backgroundColor: '#388e3c' }, color: 'white'
                                }}
                            />
                            <Chip
                                label={<Copy className='stroke-white' />}
                                onClick={() => navigator.clipboard.writeText(league.inviteCode)}
                                sx={{
                                    mr: 1, backgroundColor: '#43a047',
                                    '&:hover': { backgroundColor: '#388e3c' }
                                }}
                            />
                          </>
                        )}
                            {isAdmin && (
                                <IconButton onClick={() => setIsSettingsOpen(true)} sx={{ ml: 1 }}>
                                    <Settings style={{ color: 'white' }} />
                                </IconButton>
                            )}
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: '#43a047',
                                '&:hover': { backgroundColor: '#388e3c' },
                                color: 'white',
                                mr: 1
                            }}
                            startIcon={<Users className='stroke-white' />}
                            onClick={() => setSection('members')}
                        >
                            {`${league.members?.length || 0} Members`}
                        </Button>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: '#43a047',
                                '&:hover': { backgroundColor: '#388e3c' },
                                color: 'white',
                                mr: 1
                            }}
                            startIcon={<Calendar className='stroke-white' />}
                            onClick={() => setSection('matches')}
                        >
                            {`${league.matches?.length || 0} Matches`}
                        </Button>
                        <Button
                           variant="contained"
                           sx={{
                               backgroundColor: '#43a047',
                               '&:hover': { backgroundColor: '#388e3c' },
                           }}
                            startIcon={<Table2Icon className='stroke-white' />}
                            onClick={() => setSection('table')}
                        >
                            Table
                        </Button>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: '#43a047',
                                '&:hover': { backgroundColor: '#388e3c' },
                            }}
                            startIcon={<Trophy className='stroke-white' />}
                            onClick={() => setSection('awards')}
                        >
                            Trophy Room
                        </Button>
                        {isAdmin && (
                            <Link href={`/league/${leagueId}/match`} passHref>
                                <Button
                                  variant="contained"
                                  sx={{
                                      backgroundColor: '#43a047',
                                      '&:hover': { backgroundColor: '#388e3c' },
                                  }}
                                  startIcon={<Calendar className='stroke-white' />}
                                    disabled={!league.active}
                                >
                                    Schedule New Match
                                </Button>
                        </Link>
                        )}
                        {/* </Link> */}
                    </Box>
                </Paper>
            </Box>
            {/* Section Content */}
            <Paper sx={{ p: 3, backgroundColor: '#1f673b', color: 'white', minHeight: 400 }}>
                {section === 'members' && (
                    // Members Section
                    <Box sx={{ maxHeight: 350, overflowY: 'auto', scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}>
                        <Typography variant="h6" sx={{ backgroundColor: '#1f673b', padding: '10px', color: 'white' }} gutterBottom>
                            League Members
                        </Typography>
                        <Divider sx={{ mb: 2, backgroundColor: 'rgba(255,255,255,0.3)' }} />
                        {league.members && league.members.length > 0 ? (
                            <Box sx={{
                                display: 'grid',
                                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
                                gap: 2
                            }}>
                                {league.members.map((member) => (
                                    <PlayerCard key={member.id} member={{
                                        id: member.id || '',
                                        firstName: member.firstName || '',
                                        lastName: member.lastName || '',
                                        profilePicture: member.profilePicture || Group.src,
                                        position: member.positionType || undefined,
                                        shirtNumber: member.shirtNumber || 22,
                                    }} />
                                ))}
                            </Box>
                        ) : (
                            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                No members yet
                            </Typography>
                        )}
                    </Box>
                )}
                {section === 'matches' && (
                    // Matches Section
                    <Box sx={{ maxHeight: 350, overflowY: 'auto', scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}>
                        <Typography variant="h6" gutterBottom>
                            Recent Matches
                        </Typography>
                        <Divider sx={{ mb: 2, backgroundColor: 'rgba(255,255,255,0.3)' }} />
                        {league.matches && league.matches.length > 0 ? (
                            <Box sx={{
                                display: 'grid',
                                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr' },
                                gap: 2
                            }}>
                                {league.matches.slice(0, 5).map((match) => {
                                    const isUserAvailable = !!match.availableUsers?.some(u => u?.id === user?.id);
                                    const { availableCount, pendingCount } = getAvailabilityCounts(match);
                                    return (
                                        <Card key={match.id} sx={{ backgroundColor: '#0a3e1e', position: 'relative' , border:'2px solid green'}}>
                                            <CardContent sx={{ p: 2 }}>
                                                {isAdmin && (
                                                    <Link href={`/league/${leagueId}/match/${match.id}/edit`} passHref>
                                                        <IconButton
                                                            size="small"
                                                            sx={{ position: 'absolute', top: 8, right: 8, color: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' } }}
                                                            disabled={!league.active}
                                                        >
                                                            <Edit size={16} />
                                                        </IconButton>
                                                    </Link>
                                                )}
                                                   <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mb: 2 }}>
                                            <Typography color="success.main">Available: {availableCount}</Typography>
                                            <Typography color="warning.main">Pending: {pendingCount}</Typography>
                                        </Box>
                                                <Link href={`/match/${match?.id}`} >
                                                    <Box sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        gap: { xs: 2, sm: 4 },
                                                        textAlign: 'center',
                                                        p: 2,
                                                        minHeight: 100 // ensures consistent height
                                                    }}>
                                                        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                                                        <Image src={leagueIcon} alt={match.homeTeamName} width={48} height={48} />
                                                            <Typography
                                                                textTransform="uppercase"
                                                                variant="h6"
                                                                sx={{
                                                                    color: 'white',
                                                                    fontWeight: 'bold',
                                                                    minHeight: 32,
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    px: 1,
                                                                    textAlign: 'center',
                                                                    whiteSpace: 'nowrap',
                                                                    overflow: 'hidden',
                                                                    textOverflow: 'ellipsis',
                                                                    width: '100%'
                                                                }}
                                                                title={match.homeTeamName}
                                                            >
                                                            {match.homeTeamName}
                                                        </Typography>
                                                    </Box>
                                                        <Typography variant="h5" sx={{ color: 'white', minWidth: 40, textAlign: 'center' }}>
                                                        VS
                                                    </Typography>
                                                        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                                                        <Image src={leagueIcon} alt={match.awayTeamName} width={48} height={48} />
                                                            <Typography
                                                                textTransform="uppercase"
                                                                variant="h6"
                                                                sx={{
                                                                    color: 'white',
                                                                    fontWeight: 'bold',
                                                                    minHeight: 32,
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    px: 1,
                                                                    textAlign: 'center',
                                                                    whiteSpace: 'nowrap',
                                                                    overflow: 'hidden',
                                                                    textOverflow: 'ellipsis',
                                                                    width: '100%'
                                                                }}
                                                                title={match.awayTeamName}
                                                            >
                                                            {match.awayTeamName}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                                </Link>
                                                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', display: 'block', textAlign: 'center', mt: 1 }}>
                                                    {new Date(match.date).toLocaleString()}
                                                </Typography>
                                                <Divider sx={{ my: 2, backgroundColor: 'rgba(255,255,255,0.3)' }} />
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    {isMember && match.status === 'scheduled' && (
                                                    <Button
                                                        variant="contained"
                                                        onClick={() => handleToggleAvailability(match.id, isUserAvailable)}
                                                            disabled={availabilityLoading[match.id] || !league.active}
                                                        sx={{
                                                            backgroundColor: isUserAvailable ? '#4caf50' : '#f44336',
                                                            '&:hover': {
                                                                backgroundColor: isUserAvailable ? '#388e3c' : '#d32f2f'
                                                            },
                                                            '&.Mui-disabled': {
                                                                backgroundColor: 'rgba(255,255,255,0.3)',
                                                                color: 'rgba(255,255,255,0.5)'
                                                            }
                                                        }}
                                                    >
                                                            {availabilityLoading[match.id] ? <CircularProgress size={20} color="inherit" /> : (isUserAvailable ? 'Unavailable' : 'Available')}
                                                        </Button>
                                                    )}
                                                    {match.status === 'completed' && (
                                                        <Button
                                                            variant="contained"
                                                            disabled
                                                            sx={{
                                                                '&.Mui-disabled': {
                                                                    backgroundColor: '#43a047',
                                                                    color: 'white',
                                                                    '&:hover': { bgcolor: '#388e3c' },
                                                                }
                                                            }}
                                                        >
                                                            Match Ended
                                                    </Button>
                                                    )}
                                                     {(match.homeTeamUsers?.length > 0 || match.awayTeamUsers?.length > 0) && (
                                                    <Link href={`/league/${leagueId}/match/${match.id}/play`} passHref>
                                                        <Button
                                                            size="small"
                                                            sx={{
                                                                backgroundColor: '#43a047',
                                                                color: 'white', '&:hover': { bgcolor: '#388e3c' }, mt: 1, ml: 1
                                                            }}
                                                            disabled={!league.active}
                                                        >
                                                                {isAdmin ? 'Update Score Card' : 'View Team'}
                                                        </Button>
                                                    </Link>
                                                )}
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </Box>
                        ) : (
                            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                No matches scheduled yet
                            </Typography>
                        )}
                    </Box>
                )}
                {section === 'table' && (
                    // Table Section
                    <Box sx={{
                        maxHeight: 350,
                        overflowY: 'auto',
                        scrollbarWidth: 'none',
                        '&::-webkit-scrollbar': { display: 'none' }
                    }}>
                        <Typography variant="h6" gutterBottom>
                            League Table
                        </Typography>
                        <Divider sx={{ mb: 2, backgroundColor: 'rgba(255,255,255,0.3)' }} />
                        <Box>
                          <Box sx={{ bgcolor: '#43a047', borderRadius: 3, px: 2, py: 1, mb: 2, display: 'flex', alignItems: 'center' }}>
                              <Box sx={{color: 'white', fontWeight: 'bold' }}>Pos</Box>
                              <Box sx={{ ml:4,flex: 1, color: 'white', fontWeight: 'bold' }}>Player</Box>
                              <Box sx={{ display: 'flex', gap: 4, color: 'white', fontWeight: 'bold' }}>
                                  <Box sx={{ minWidth: 32, textAlign: 'center' }}>P</Box>
                                  <Box sx={{ minWidth: 32, textAlign: 'center' }}>W</Box>
                                  <Box sx={{ minWidth: 32, textAlign: 'center' }}>D</Box>
                                  <Box sx={{ minWidth: 32, textAlign: 'center' }}>L</Box>
                                  <Box sx={{ minWidth: 48, textAlign: 'center' }}>W%</Box>
                              </Box>
                          </Box>
                          <Box>
                              {tableData.length > 0 ? tableData.map((row, idx) => {
                                  // Row background and text color logic
                                  let rowBg = '#0a4822';
                                  let textColor = '#fff';
                                  const subTextColor = '#fff';
                                  let fontWeight = 500;
                                  let badgeImg = null;
                                  let rowGradient = null;
                                  if (idx === 0) {
                                    rowGradient = '#0a3e1e'; // gold/orange
                                    textColor = '#fff';
                                    fontWeight = 700;
                                    badgeImg = FirstBadge;
                                  } else if (idx === 1) {
                                    rowBg = '#0a4822'; // silver
                                    badgeImg = SecondBadge;
                                  } else if (idx === 2) {
                                    rowBg = '#094420'; // bronze
                                    badgeImg = ThirdBadge;
                                  } else {
                                    rowBg = '#0a4822';
                                  }
                                  return (
                                    <React.Fragment key={row.id}>
                                        <Link href={`/player/${row.id}`} passHref> 
                                      <Box
                                        sx={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          px: 2, // padding x = 2
                                          py: 1.5,
                                          background: rowGradient ? rowGradient : rowBg,
                                          color: textColor,
                                          fontWeight,
                                          boxShadow: 'none',
                                          minHeight: 60,
                                        }}
                                      >
                                        {/* Position badge */}
                                        <Box sx={{ width: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 1 }}>
                                          {badgeImg ? (
                                            <Image src={badgeImg} alt={`${idx + 1}st`} width={32} height={32} />
                                          ) : (
                                            <Box sx={{
                                              width: 28, height: 28, display: 'flex',
                                              alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#fff', fontSize: 14
                                            }}>{`${idx + 1}th`}</Box>
                                          )}
                                        </Box>
                                        {/* Team logo/profile */}
                                        <Box sx={{ width: 44, height: 44, borderRadius: '50%', overflow: 'hidden', background: '#fff', mr: 2, border: '2px solid #eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                          <img
                                            src={row.profilePicture || '/assets/group.svg'}
                                            alt={row.name}
                                            width={40}
                                            height={40}
                                            style={{ borderRadius: '50%', objectFit: 'cover', width: 40, height: 40, display: 'block' }}
                                          />
                                        </Box>
                                        {/* Team name and player name */}
                                        <Box sx={{ flex: 1, minWidth: 0 }}>
                                          <Typography variant="body1" sx={{ fontWeight: 700, color: textColor, fontSize: 16, lineHeight: 1.1, textTransform: 'uppercase', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {row.name.split(' ')[0]}
                                          </Typography>
                                          <Typography variant="body2" sx={{ color: subTextColor, fontWeight: 400, fontSize: 13, lineHeight: 1.1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {row.name.split(' ').slice(1).join(' ')}
                                          </Typography>
                                        </Box>
                                        {/* Stats */}
                                        <Box sx={{ display: 'flex', gap: 4, ml: 'auto' }}>
                                          <Box sx={{ minWidth: 32, textAlign: 'center', color: textColor }}>{row.played}</Box>
                                          <Box sx={{ minWidth: 32, textAlign: 'center', color: textColor }}>{row.wins}</Box>
                                          <Box sx={{ minWidth: 32, textAlign: 'center', color: textColor }}>{row.draws}</Box>
                                          <Box sx={{ minWidth: 32, textAlign: 'center', color: textColor }}>{row.losses}</Box>
                                          <Box sx={{ minWidth: 48, textAlign: 'center', color: textColor }}>{row.winPercentage}</Box>
                                        </Box>
                                      </Box>
                                      <Divider sx={{backgroundColor: '#fff', height: 1, mb: 0, mt: 0 }} />
                                      </Link>
                                    </React.Fragment>
                                  );
                                }) : (
                                  <Paper sx={{ p: 2, textAlign: 'center', borderRadius: 3 }}>No data</Paper>
                                )}
                          </Box>
                        </Box>
                    </Box>
                )}
                {section === 'awards' && (
                    // Trophy Room Section
                    <Box sx={{ maxHeight: 'none', p: 0 }}>
                        <TrophyRoom leagueId={leagueId} />
                    </Box>
                        )}
                    </Paper>
            <Dialog open={teamModalOpen} onClose={handleCloseTeamModal} fullWidth maxWidth="sm">
                <DialogTitle>Teams for {selectedMatch?.homeTeamName} vs {selectedMatch?.awayTeamName}</DialogTitle>
                <DialogContent>
                    {selectedMatch && (
                        <Box>
                            <Typography variant="h6" gutterBottom>{selectedMatch.homeTeamName}</Typography>
                            <Divider sx={{ mb: 2, backgroundColor: 'rgba(255,255,255,0.3)' }} />
                            <Grid container spacing={1}>
                                {selectedMatch.homeTeamUsers.map(player => (
                                    <Grid xs={6} key={player.id}>
                                        <Chip label={`${player.firstName} ${player.lastName}`} sx={{ m: 0.5, color: 'black' }} />
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    )}
                    {selectedMatch && (
                        <Box>
                            <Typography variant="h6" gutterBottom>{selectedMatch.awayTeamName}</Typography>
                            <Divider sx={{ mb: 2, backgroundColor: 'rgba(255,255,255,0.3)' }} />
                            <Grid container spacing={1}>
                                {selectedMatch.awayTeamUsers.map(player => (
                                    <Grid xs={6} key={player.id}>
                                        <Chip label={`${player.firstName} ${player.lastName}`} sx={{ m: 0.5, color: 'black' }} />
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseTeamModal}>Close</Button>
                </DialogActions>
            </Dialog>
            <LeagueSettingsDialog
                open={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
                league={league}
                onUpdate={handleUpdateLeague}
                onDelete={handleDeleteLeague}
            />
            <Snackbar
                open={!!toastMessage}
                autoHideDuration={3000}
                onClose={() => setToastMessage(null)}
                message={toastMessage}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            />
        </Box>
    );
} 