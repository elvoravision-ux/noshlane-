import React, { useState } from 'react';
import { useContent } from '../../../context/ContentContext';
import { TeamMember } from '../../../data/team';
import { ImageUploader, ConfirmModal } from '../../../components/admin/AdminComponents';
import { Plus, Edit2, Trash2, Award, Briefcase, GraduationCap, Mail, Linkedin } from 'lucide-react';

export const AdminTeamTab: React.FC = () => {
  const { team, saveTeamMember, deleteTeamMember } = useContent();

  const [toastMsg, setToastMsg] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const showToast = (message: string, type: 'success' | 'error') => {
    setToastMsg({ message, type });
    setTimeout(() => setToastMsg(null), 3500);
  };

  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);

  const initialForm: TeamMember = {
    id: '',
    name: '',
    role: '',
    department: 'Paid Acquisition',
    bio: '',
    specialties: ['Media Buying', 'Conversion Architecture'],
    education: 'LUMS / IBA',
    experience: '5+ Years',
    image: '',
    tools: ['Meta Ads Manager', 'Figma', 'Google Analytics 4'],
    notableAchievement: 'Generated PKR 50M+ in pipeline revenue',
    linkedin: 'https://linkedin.com/in/',
    email: 'team@noshlane.com',
    avatarInitials: 'TM'
  };

  const [formData, setFormData] = useState<TeamMember>(initialForm);

  const handleOpenAdd = () => {
    setEditingMember(null);
    setFormData({
      ...initialForm,
      id: `member-${Date.now()}`
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (member: TeamMember) => {
    setEditingMember(member);
    setFormData(JSON.parse(JSON.stringify(member)));
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.role) {
      showToast('Name and Role are required', 'error');
      return;
    }

    try {
      const initials = formData.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

      const toSave: TeamMember = {
        ...formData,
        id: formData.id || `member-${Date.now()}`,
        avatarInitials: initials || 'TM'
      };

      await saveTeamMember(toSave, !editingMember);
      showToast(editingMember ? 'Team member updated!' : 'Team member added!', 'success');
      setIsModalOpen(false);
    } catch {
      showToast('Failed to save team member', 'error');
    }
  };

  const confirmDelete = async () => {
    if (!isDeletingId) return;
    try {
      await deleteTeamMember(isDeletingId);
      showToast('Team member removed successfully', 'success');
    } catch {
      showToast('Failed to delete team member', 'error');
    } finally {
      setIsDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMsg && (
        <div className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-xl shadow-xl text-sm font-medium flex items-center gap-2 ${
          toastMsg.type === 'success' ? 'bg-emerald-500 text-black' : 'bg-red-500 text-white'
        }`}>
          {toastMsg.message}
        </div>
      )}

      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#120D24] p-5 rounded-2xl border border-white/5">
        <div>
          <h2 className="text-xl font-bold text-white">Team Members ({team.length})</h2>
          <p className="text-xs text-white/50 mt-1">Manage executive leadership, department leads, and bios</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-medium hover:opacity-90 transition shadow-lg shadow-cyan-500/20 text-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Team Member
        </button>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map((member) => (
          <div
            key={member.id}
            className="bg-[#120D24] border border-white/5 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition flex flex-col justify-between group"
          >
            <div>
              <div className="relative h-56 bg-black/40 overflow-hidden">
                <img
                  src={member.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <span className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-semibold text-cyan-400 border border-white/10">
                  {member.department}
                </span>
              </div>

              <div className="p-5 space-y-3">
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition">{member.name}</h3>
                  <p className="text-xs text-indigo-400 font-medium">{member.role}</p>
                </div>

                <p className="text-xs text-white/60 line-clamp-3 leading-relaxed">
                  {member.bio}
                </p>

                <div className="space-y-1.5 pt-2 text-[11px] text-white/50 border-t border-white/5">
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Experience: {member.experience}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{member.education}</span>
                  </div>
                  {member.notableAchievement && (
                    <div className="flex items-center gap-1.5 text-cyan-300">
                      <Award className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{member.notableAchievement}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-5 pt-0 flex items-center justify-between border-t border-white/5 mt-2">
              <div className="flex gap-2 text-white/40">
                {member.linkedin && (
                  <a href={member.linkedin} target="_blank" rel="noreferrer" className="hover:text-cyan-400">
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {member.email && (
                  <a href={`mailto:${member.email}`} className="hover:text-cyan-400">
                    <Mail className="w-4 h-4" />
                  </a>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(member)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-cyan-500/20 text-white/70 hover:text-cyan-400 transition cursor-pointer"
                  title="Edit member"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsDeletingId(member.id)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-white/70 hover:text-red-400 transition cursor-pointer"
                  title="Delete member"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#120D24] border border-white/10 rounded-2xl max-w-2xl w-full p-6 my-8 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-white/10">
              <h3 className="text-lg font-bold text-white">
                {editingMember ? 'Edit Team Member' : 'Add New Team Member'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-white/40 hover:text-white text-sm cursor-pointer">✕</button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-white/60 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#1A1433] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                    placeholder="e.g. Zohair Khan"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/60 mb-1">Role / Position *</label>
                  <input
                    type="text"
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full bg-[#1A1433] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                    placeholder="e.g. Founder & Head of Strategy"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-white/60 mb-1">Department</label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full bg-[#1A1433] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400 text-xs"
                    placeholder="Creative Studio"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/60 mb-1">Experience</label>
                  <input
                    type="text"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full bg-[#1A1433] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400 text-xs"
                    placeholder="7+ Years"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/60 mb-1">Education / Alma Mater</label>
                  <input
                    type="text"
                    value={formData.education}
                    onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                    className="w-full bg-[#1A1433] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400 text-xs"
                    placeholder="LUMS / NCA"
                  />
                </div>
              </div>

              {/* Photo Upload */}
              <ImageUploader
                label="Profile Photo (Direct URL or Upload Image)"
                value={formData.image}
                onChange={(url) => setFormData({ ...formData, image: url })}
                folder="team"
              />

              <div>
                <label className="block text-xs text-white/60 mb-1">Bio / Profile Description</label>
                <textarea
                  rows={3}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full bg-[#1A1433] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400 text-xs"
                  placeholder="Professional background, career milestones, focus..."
                />
              </div>

              <div>
                <label className="block text-xs text-white/60 mb-1">Notable Achievement</label>
                <input
                  type="text"
                  value={formData.notableAchievement}
                  onChange={(e) => setFormData({ ...formData, notableAchievement: e.target.value })}
                  className="w-full bg-[#1A1433] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400 text-xs text-cyan-300"
                  placeholder="e.g. Scaled 4 D2C brands past PKR 100M+ in annual revenue"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-white/60 mb-1">LinkedIn URL</label>
                  <input
                    type="text"
                    value={formData.linkedin || ''}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    className="w-full bg-[#1A1433] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400 text-xs"
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/60 mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#1A1433] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400 text-xs"
                    placeholder="name@noshlane.com"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-white/60 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs transition cursor-pointer"
                >
                  Save Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={!!isDeletingId}
        title="Remove Team Member"
        message="Are you sure you want to remove this member? They will no longer be listed on the about page."
        confirmLabel="Remove"
        onConfirm={confirmDelete}
        onCancel={() => setIsDeletingId(null)}
      />
    </div>
  );
};
